const { WhishList } = require("../models/whishList");
const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  const myList = await myList.find();

  if (!myList) {
    res.status(500).json({ success: false });
  }
  res.send(myList);
});

router.get("/", async (req, res) => {
  try {
    const myList = await WhishList.find(req.query);
    if (!myList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json(myList);
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const whishListItem = await WhishList.findById(req.params.id);
  if (!whishListItem) {
    res.status(404).json({
      message: "Cart not found!",
      success: false,
    });
  }
  const whishListDelete = await WhishList.findByIdAndDelete(req.params.id);
  if (!whishListDelete) {
    res.status(404).json({
      message: "WhistList item deleted fail",
      success: false,
    });
  }
  res.status(200).json({
    success: true,
    message: "WhistList Item Deleted!",
  });
});

router.post("/add", async (req, res) => {
  const myWhishList = await WhishList.findOne({productId: req.body.productId});
  if(!myWhishList) {
    let whishList = new WhishList({
      productTitle: req.body.productTitle,
      image: req.body.image,
      rating: req.body.rating,
      price: req.body.price,
      productId: req.body.productId,
      userId: req.body.userId,
    });

    if (!whishList) {
      res.status(500).json({
        err: err,
        success: "false",
      });
    }
  
    whishList = await whishList.save();
  
    res.status(201).json(whishList);
  }else {
    res.status(401).json({
      status: false,
      msg: "Product was already in WhishList"
    })
  }

});


router.get("/count", async (req,res) => {
  const listCount= await WhishList.countDocuments();

  if(!listCount) {
    res.status(500).json({
      success: false
    })
  }
  return res.status(200).json(listCount);
})
module.exports = router;
