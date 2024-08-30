const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  ingredients: [String],
  image: String
});

const menuSchema = new mongoose.Schema({
  category: String,
  dishes: [dishSchema],
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming the user collection is named 'User'
  },
});

module.exports = mongoose.model('Menu', menuSchema);
