const { Category } = require("../models/category");
const express = require("express");
const { ImageUpload } = require("../models/imageUpload");

const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME_CLOUDINARY,
  api_key: process.env.REACT_APP_CLOUD_APIKEY_CLOUDINARY,
  api_secret: process.env.REACT_APP_CLOUD_APISECRET_CLOUDINARY,
  secure: true,
});
const multer = require("multer");
const fs = require("fs");

var imagesArray = [];
var categoryEditId;

const path = require("path"); // Import path for handling file extensions

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categoryUploaded"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + extension); // Append the extension
  },
});
const upload = multer({ storage: storage });

router.post(`/upload`, upload.array("images"), async (req, res) => {
  try {
    imagesArray = [];

    const uploadPromises = req.files.map(async (file) => {
      const options = {
        folder: "oclock_mern", // Add a folder to organize uploads

        resource_type: "auto",

        public_id: `${Date.now()}_${file.originalname.split(".")[0]}`, // Create unique public_id
      };

      // Upload to Cloudinary and wait for the result

      const result = await cloudinary.uploader.upload(file.path, options);

      // Clean up local file after successful upload

      fs.unlinkSync(file.path);

      return result.secure_url;
    });

    // Wait for all uploads to complete

    const uploadedUrls = await Promise.all(uploadPromises);

    imagesArray = uploadedUrls;

    // Save to ImageUpload collection

    const imagesUploaded = new ImageUpload({
      images: imagesArray,
    });

    await imagesUploaded.save();

    return res.status(200).json(imagesArray);
  } catch (error) {
    console.error("Error uploading images:", error);

    // Clean up any local files in case of error

    req.files?.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    return res.status(500).json({ error: "Failed to upload images" });
  }
});

// Update the deleteImage route

router.delete("/deleteImage", async (req, res) => {
  try {
    const { img } = req.query;

    if (!img) {
      return res.status(400).json({ error: "Image parameter is required" });
    }

    // Extract public_id from Cloudinary URL

    const publicId = img.split("/").pop().split(".")[0];

    try {
      // Delete image from Cloudinary

      await cloudinary.uploader.destroy(publicId);

      // Update ImageUpload collection to remove the image

      await ImageUpload.updateMany(
        { images: img },

        { $pull: { images: img } }
      );

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);

      // If image doesn't exist in Cloudinary, still remove from database

      await ImageUpload.updateMany(
        { images: img },

        { $pull: { images: img } }
      );

      res.status(200).json({ message: "Image reference removed" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);

    res.status(500).json({ error: "Failed to delete image" });
  }
});

router.get("/all", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const totalPosts = await Category.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found!" });
    }
    const categoryList = await Category.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!categoryList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json({
      categoryList: categoryList,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

router.get("/:id", async (req, res) => {
  categoryEditId = req.params.id;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  return res.status(200).send(category);
});

router.delete("/:id", async (req, res) => {
  const deleteCate = await Category.findByIdAndDelete(req.params.id);

  if (!deleteCate) {
    res.status(404).json({
      message: "Category not found!",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Category Deleted!",
  });
});

router.post("/create", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    images: imagesArray,
    description: req.body.description,
  });

  if (!category) {
    res.status(500).json({
      err: err,
      success: "false",
    });
  }

  category = await category.save();

  imagesArray = [];

  res.status(201).json(category);
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: imagesArray,
        description: req.body.description,
      },
      { new: true }
    );

    if (!category) {
      return res.status(500).json({
        message: "Category cannot be updated",
        success: false,
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the category",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
