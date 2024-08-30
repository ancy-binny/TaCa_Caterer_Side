const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: String, required: true },
  catererId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  accepted: {type: Boolean,default: false},
  status: {
    packed: { type: Boolean, default: false },
    sent: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
    payment: { type: Boolean, default: false }
  },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
