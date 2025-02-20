const express = require("express");
const Stripe = require("stripe");
const { checkout } = require("./orders");
const { json } = require("body-parser");
const { Orders } = require("../models/orders");
require("dotenv").config();
const { saveCartData } = require("../helper/cartService");
const CartOrder = require("../models/fakeCart");
const { Cart } = require("../models/cart");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const cartId = await saveCartData(req.body.cartData, req.body.userId);
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(req.body.cartData).substring(0, 450) + '...',
      cart: cartId,
      //
    },
  });

  const line_items = req.body.cartData.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.productTitle,
          images: [item?.image],
          metadata: {
            id: item?.id,
            userId: item?.userId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "VN", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    payment_method_types: ["card"],
    customer: customer.id,
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/checkout-success`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });

  // Remove cart items from the database
  for (const item of req.body.cartData) {
    await Cart.findOneAndDelete({
      productId: item.productId,
      userId: req.body.userId,
    });
  }

  // res.send({
  //   url: session.url
  // })
  res.json({ url: session.url });
});
// Create Order

const createOrder = async (customer, data) => {
  try {
    // Log the cart metadata
    console.log("Cart metadata to parse:", customer.metadata.cart);
    console.log("dataaaa:", data);

    // Fetch the cart data from the database
    const cartId = customer.metadata.cart;
    const cartData = await CartOrder.findById(cartId);
    if (!cartData) {
      throw new Error("Cart data not found for the given cart ID");
    }

    // Use the fetched cart data
    const Item = cartData.cartItems;
    const transformedItems = Item.map((item) => ({
      productImage: item.image, // Add the product image
      productName: item.productTitle, // Add the product title
      quantity: item.quantity, // Add quantity
      price: item.price, // Add price
      total: item.subTotal, // Add total (subTotal in your Item data)
    }));
    // Create a new order object
    const newOrder = new Orders({
      userId: customer.metadata.userId,
      paymentId: data.payment_intent,
      products: transformedItems,
      amount: data.amount_total / 100, // Convert cents to dollars
      name: data.customer_details.name,
      phoneNumber: data.customer_details.phone,
      address:
        data.customer_details.address.line1 +
        " " +
        data.customer_details.address.line2 +
        " " +
        data.customer_details.address.city,
      pincode: data.customer_details.address.postal_code,
      email: data.customer_details.email,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);

    // Clear the cart for the user
    await CartOrder.findByIdAndDelete(cartId);
    console.log(`Cart data for cart ID ${cartId} cleared successfully.`);
  } catch (error) {
    console.error("Error in createOrder:", error.message);
  }
};

// Webhooks
let endpointSecret;
// endpointSecret = 'whsec_f10063ddff1c184d038c8906f0aaf26870ec0bc8e5922b49f1de4e317ec6c316';
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;
    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          console.log("data customer", customer);
          console.log("data", data);
          createOrder(customer, data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    // Return a response to acknowledge receipt of the event
    res.send().end();
    // response.json({received: true});
  }
);

module.exports = router;
