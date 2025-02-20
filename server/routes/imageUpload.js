const express = require('express');
const router = express.Router();
const {ImageUpload} = require("../models/imageUpload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME_CLOUDINARY,
  api_key: process.env.REACT_APP_CLOUD_APIKEY_CLOUDINARY,
  api_secret: process.env.REACT_APP_CLOUD_APISECRET_CLOUDINARY,
  secure: true
});
router.get("/", async (req, res) => {
  try {
    // If you have a specific ImageUpload model
    const images = await ImageUpload.find({});
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

router.delete('/deleteAllImages', async (req, res) => {
  try {
    // Get all image documents before deletion
    const images = await ImageUpload.find({});
    
    // Delete images from Cloudinary
    for (const doc of images) {
      for (const imageUrl of doc.images) {
        try {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Error deleting from Cloudinary:", err);
        }
      }
    }

    // Delete all documents from the ImageUpload collection
    await ImageUpload.deleteMany({});
    
    // Return the deleted images data
    res.status(200).json(images[0] || { 
      _id: "",
      images: [],
      __v: 0,
      id: "" 
    });

  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ error: "Failed to delete images" });
  }
});

module.exports = router;