const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {Product} = require('../models/products')

router.get("/", async (req,res) => {
  try {
    const query = req.query.q;
    if(!query) {
      return res.status(400).json({
        msg: 'Query is required'
      })
    }

    const item = await Product.find({
      $or: [
        {name: { $regex: query, $options: 'i'}},
        {brand: { $regex: query, $options: 'i'}},
        {cateName: { $regex: query, $options: 'i'}},
      ]
    })

    res.json(item);

  } catch (error) {
      res.status(500).json({
        msg: 'Server error'
      })
      console.log(error);
  }
})

module.exports = router;