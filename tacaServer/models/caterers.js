// models/caterers.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  ingredients: { type: [String], required: true },
  image: { type: String, required: true },
  category: { type: String, required: true,unique: true } // Add category field
});

const userSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  rating: { type: Number},
  image: { type: String},
  dishes: [dishSchema] // Add dishes array to user schema
});


module.exports = mongoose.model('Caterer', userSchema);
