const mongoose = require("mongoose");

const relatedProductSchema = mongoose.Schema({
  recentId: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  cateName: {
    type: String,
    default: "",
  },
  cateId: {
    type: String,
    default: "",
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

relatedProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
relatedProductSchema.set("toJSON", {
  virtuals: true,
});
exports.RelatedProducts = mongoose.model(
  "RelatedProducts",
  relatedProductSchema
);
