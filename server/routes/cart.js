const { Cart } = require("../models/cart");
const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get("/", async (req, res) => {
  try {
    const cartList = await Cart.find(req.query);
    if (!cartList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json(cartList);
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

// router.delete("/:id", async (req, res) => {
//   const cartItem = await Cart.findById(req.params.id);
//   if (!cartItem) {
//     res.status(404).json({
//       message: "Cart not found!",
//       success: false,
//     });
//   }
//   const cartDelete = await Cart.findByIdAndDelete(req.params.id);
//   if (!cartDelete) {
//     res.status(404).json({
//       message: "Cart item deleted fail",
//       success: false,
//     });
//   }
//   res.status(200).json({
//     success: true,
//     message: "Cart Deleted!",
//   });
// });
router.delete("/:id", async (req, res) => {
  try {
    // Kiểm tra xem cart item có tồn tại không
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({
        message: "Cart not found!",
        success: false,
      });
    }

    // Xóa cart item
    const cartDelete = await Cart.findByIdAndDelete(req.params.id);
    if (!cartDelete) {
      return res.status(500).json({ // Thay đổi trạng thái thành 500 (lỗi server)
        message: "Cart item deletion failed!",
        success: false,
      });
    }

    // Phản hồi nếu thành công
    return res.status(200).json({
      success: true,
      message: "Cart Deleted!",
    });
  } catch (error) {
    // Xử lý lỗi không mong muốn
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});


router.post("/add", async (req, res) => {
  const cartItem = await Cart.findOne({productId: req.body.productId});
  if(!cartItem) {
    let cartList = new Cart({
      productTitle: req.body.productTitle,
      image: req.body.image,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId,
    });

    if (!cartList) {
      res.status(500).json({
        err: err,
        success: "false",
      });
    }
  
    cartList = await cartList.save();
  
    res.status(201).json(cartList);
  }else {
    res.status(401).json({
      status: false,
      msg: "Product was already in CART"
    })
  }

});

router.put("/:id", async (req, res) => {
  try {
    const cartList = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        productTitle: req.body.productTitle,
        image: req.body.image,
        rating: req.body.rating,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        productId: req.body.productId,
        userId: req.body.userId,
      },
      { new: true }
    );

    if (!cartList) {
      return res.status(500).json({
        message: "Cart item cannot be updated",
        success: false,
      });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      success: true,
      cartList,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the cart",
      success: false,
      error: error.message,
    });
  }
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
