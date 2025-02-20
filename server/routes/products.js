const { Category } = require("../models/category");
const { RelatedProducts } = require("../models/relatedProducts");
const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const { ImageUpload } = require("../models/imageUpload");
const multer = require("multer");
const fs = require("fs");
var imagesArray = [];
var productEditId;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })
const path = require("path"); // Import path for handling file extensions

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productsUploaded"); // Specify the destination folder
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
router.get("/all", async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get("/featured", async (req, res) => {
  const productList = await Product.find({ isFeatured: true });
  if (!productList) {
    res.status(500).json({ success: false });
  }
  return res.status(200).json(productList);
});

// router.get("/brand", async (req, res) => {
//   const productList = await Product.find({ brand: req.query.brand });
//   if (!productList) {
//     res.status(500).json({ success: false });
//   }
//   return res.status(200).json(productList);
// });

router.post("/create", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(404).send("invalid Category!");
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    images: imagesArray,
    brand: req.body.brand,
    price: req.body.price,
    oldPrice: req.body.oldPrice,
    category: req.body.category,
    cateName: req.body.cateName,
    cateId: req.body.cateId,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    discount: req.body.discount,
    dateCreated: new Date(),
  });

  product = await product.save();
  if (!product) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  res.status(201).json(product);
});

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 8;
  const totalPosts = await Product.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);

  if (page > totalPages) {
    return res.status(404).json({ message: "Page not found!" });
  }

  let productList = [];

  if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
    productList = await Product.find({
      brand: req.query.brand?.trim(),
    }).populate("category");

    const filteredProducts = productList.filter((product) => {
      if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
        return false;
      }
      if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
        return false;
      }

      if (req.query.rating === 0) return false;

      return true;
    });

    if (!productList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json({
      productList: filteredProducts,
      totalPages: totalPages,
      page: page,
    });
  } else if (req.query.page !== undefined || req.query.perPage !== undefined) {
    // Áp dụng phân trang giống đoạn code thứ hai
    productList = await Product.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!productList) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({
      productList: productList,
      totalPages: totalPages,
      page: page,
    });
  } else {
    productList = await Product.find(req.query).populate("category");

    // .skip((page - 1) * perPage)
    //   .limit(perPage).exec();;

    if (!productList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json({
      productList: productList,
      totalPages: totalPages,
      page: page,
    });
  }
});

router.get("/:id", async (req, res) => {
  productEditId = req.params.id;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      message: "The product with id given was not found!",
    });
  }

  res.status(200).send(product);
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: imagesArray, // Assuming images are provided directly in the request
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        cateName: req.body.cateName,
        cateId: req.body.cateId,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        discount: req.body.discount,

        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!product) {
      return res.status(500).json({
        message: "The product cannot be updated!",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the product",
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found!", status: false });
    }

    const images = product.images;

    // Handle image deletion
    if (images.length !== 0) {
      for (const image of images) {
        if (image.startsWith("http")) {
          // Remote URL (e.g., Cloudinary)
          const publicId = image.split("/").slice(-2).join("/").split(".")[0]; // Extract publicId
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`Deleted remote image: ${image}`);
          } catch (cloudError) {
            console.error(
              `Failed to delete remote image: ${image}`,
              cloudError
            );
          }
        } else {
          // Local file
          const localPath = `uploads/productsUploaded/${image}`;
          if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
            console.log(`Deleted local file: ${localPath}`);
          } else {
            console.warn(`Local file not found: ${localPath}`);
          }
        }
      }
    }

    // Delete the product
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({
        message: "Product not found!",
        status: false,
      });
    }

    res.status(200).json({
      message: "The product was deleted!",
      status: true,
    });
  } catch (error) {
    console.error("Error in delete route:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
});

router.post("/relatedProducts", async (req, res) => {
  try {
    console.log(req.body);
    // Kiểm tra sản phẩm có tồn tại bằng name và category (hoặc các trường phù hợp)
    let findProduct = await RelatedProducts.findOne({
      name: req.body.name,
      category: req.body.category,
    });

    if (!findProduct) {
      // Nếu không tồn tại, tạo sản phẩm mới
      let product = new RelatedProducts({
        recentId: req.body.id,
        name: req.body.name,
        description: req.body.description,
        images: req.body.images || [],
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        cateName: req.body.cateName,
        cateId: req.body.cateId,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
      });

      product = await product.save(); // Lưu sản phẩm mới
      return res.status(201).json(product); // Trả về sản phẩm vừa tạo
    }

    // Nếu sản phẩm đã tồn tại, trả về sản phẩm đó
    res.status(200).json({
      message: "Product already exists",
      product: findProduct,
    });
  } catch (err) {
    console.error("Error creating related product:", err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});
router.get("/recentlyView", async(req,res) => {
  let productList = [];
  productList = await RelatedProducts.find(req.query).populate("category subCate");
  if(!productList) {
    res.status(500).json({
      success:false
    })
  }
  return res.status(200).json({
    "productList": productList,
    
  })
})

module.exports = router;
