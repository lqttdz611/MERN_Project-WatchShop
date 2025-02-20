const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true
    }
  ],
  uploadDate: {
    type: Date,
    default: Date.now
  }
})

imageUploadSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
imageUploadSchema.set("toJSON", {
  virtuals: true,
});

exports.ImageUpload = mongoose.model('ImageUpload',imageUploadSchema);
exports.imageUploadSchema = imageUploadSchema;