const mongoose = require("mongoose");

const myListSchema = mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

myListSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
myListSchema.set("toJSON", {
  virtuals: true,
});

exports.WhishList = mongoose.model("WhishList", myListSchema);
exports.myListSchema = myListSchema;
