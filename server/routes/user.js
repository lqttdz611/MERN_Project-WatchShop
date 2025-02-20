const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const { ImageUpload } = require("../models/imageUpload");


// for upload image
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
router.post(`/upload`, upload.array("image"), async (req, res) => {
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


router.post('/sign-up', async (req, res) => {
  const { name, phone, email, password, isAdmin } = req.body;

  try {
    // Check if the user already exists
    // const existingUserName = await User.findOne({ email: email });
    const existingUserPhone = await User.findOne({ phone: phone });
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserPhone || existingUserEmail) {
      return res.status(400).json({
        error: true,
        msg: "User already exists!!",
      }); // Add return here to stop further execution
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    const result = await User.create({
      name: name,
      phone: phone,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin
    });

    // Generate a token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_SECRET_KEY
    );

    // Send success response
    return res.status(200).json({
      user: result,
      token: token,
    });
  } catch (err) {
    // Handle unexpected errors
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
});




router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({error: true, msg: "User not found!!" });
    }

    // Compare passwords
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({error: true, msg: "Invalid credentials" }); // Add return here
    }

    // Generate token
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    // Send success response
    console.log("Returning successful response:", {
      user: existingUser,
      token: token,
      msg: "User Authenticated",
    });
    return res.status(200).json({
      user: existingUser,
      token: token,
      msg: "User Authenticated",
    });
  } catch (err) {
    // Catch block for unexpected errors
    console.log(err)
    return res.status(500).json({
      msg: err.msg || err,
      error: true,
      
    });
  }
});

router.get('/', async(req, res) => {
  const userList = await User.find();

  if(!userList) {
    res.status(500).json({
      success:false
    })
  }
  res.status(200).send(userList);
})

router.get("/:id", async(req,res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return res.status(500).json({
      success: false,
      message:"The User with ID given was not found!!"
    })
  }
  res.status(200).send(user);
})

router.delete('/:id', (req,res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if(user) {
      return res.status(200).json({success: true,
        message: 'User is deleted'
      })
    } else {
      return res.status(404).json({
        success: false,
        message: "User delete failed"
      })
    }
  }).catch( err => {
    return res.status(500).json({
      success: false,
      error: err
    })
  })
})

router.get(`/get/count`, async(req,res) => {
  const userCount = await User.countDocuments({})

  if(!userCount) {
    res.status(500).json({success: false})
  }
  res.send({
    userCount: userCount 
  })
})

router.put("/:id", async(req,res) => {
  const {name, phone, email, password } = req.body;

  const userExist = await User.findById(req.params.id);
  let newPassword;

  if(req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10)
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      phone: phone,
      email: email,
      password: newPassword,
      image: imagesArray,
    },
    {new: true}
  )

  if(!user) {
    return res.status(400).send('The user cannot be updated!')
  } 
  res.send(user);
})

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
      await ImageUpload.updateMany({ images: img }, { $pull: { images: img } });

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
      // If image doesn't exist in Cloudinary, still remove from database
      await ImageUpload.updateMany({ images: img }, { $pull: { images: img } });
      res.status(200).json({ message: "Image reference removed" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});
module.exports = router; 