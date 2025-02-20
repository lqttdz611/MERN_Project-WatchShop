const mongoose = require('mongoose');

const cartOrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartItems: { type: Array, required: true }, // Store cart data as an array
  createdAt: { type: Date, default: Date.now },
});
cartOrderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
cartOrderSchema.set("toJSON", {
  virtuals: true,
});
const CartOrder = mongoose.model('CartOrder', cartOrderSchema);

module.exports = CartOrder;