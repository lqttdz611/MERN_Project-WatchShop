const { Orders } = require("../models/orders");
const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  const order = await Orders.find();

  if (!order) {
    res.status(500).json({ success: false,
      message: "No order found" });
    }
  
  
  res.send(order);
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const totalPosts = await Orders.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if(page > totalPages) {
      res.return(404).json({
        message: "No data found",
        success: false
      })
    }

    const orderList = await Orders.find().skip((page-1)*perPage).limit(perPage).exec();

    if(!orderList) {
      res.status(500).json({
        success: false
      })
    }

    return res.status(200).json({
      "orderList": orderList,
      "totalPages": totalPages,
      "page": page
    })
  } catch (error) {
    res.status(500).json({
      success: false,
    })
  }
});

router.delete("/:id", async (req, res) => {
  const orderItem = await Orders.findById(req.params.id);
  if (!orderItem) {
    res.status(404).json({
      message: "Order not found!",
      success: false,
    });
  }
  const orderDelete = await Orders.findByIdAndDelete(req.params.id);
  if (!orderDelete) {
    res.status(404).json({
      message: "Order item deleted fail",
      success: false,
    });
  }
  res.status(200).json({
    success: true,
    message: "Order Deleted!",
  });
});

router.post("/create", async (req, res) => {

    let order = new Orders({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      pincode: req.body.pincode,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      email: req.body.email,
      userId: req.body.userId,
      products: req.body.products,
 
    });

    if (!order) {
      res.status(500).json({
        err: err,
        success: "false",
      });
    }
  
    order = await order.save();
  
    res.status(201).json(order);
  }
    
  

);

router.put("/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      pincode: req.body.pincode,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      email: req.body.email,
      userId: req.body.userId,
      products: req.body.products,
      status:req.body.status,
      },
      { new: true }
    );

    if (!order) {
      return res.status(500).json({
        message: "Order item cannot be updated",
        success: false,
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the Order",
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if(!order) {
    res.status(500).json({
      success: false,
      message: "The order with id given not found!!"
    })
  }
  return res.status(200).send(order);
});
router.get("/count", async (req,res) => {
  const cartCount= await Cart.countDocuments();

  if(!cartCount) {
    res.status(500).json({
      success: false
    })
  }
  return res.status(200).json(cartCount);
})
module.exports = router;
