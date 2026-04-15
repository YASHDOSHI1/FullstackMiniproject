
const mongoose = require('mongoose');

const carSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { _id: false });

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  production: { type: String, required: true },
  carClass: { type: String, required: true },
  bodyStyle: { type: String, required: true },
  fuelFeed: { type: String, required: true },
  weight: { type: String, required: true },
  topSpeed: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }], // Changed from image to images array
  year: { type: Number, required: true },
  sections: [carSectionSchema],
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
