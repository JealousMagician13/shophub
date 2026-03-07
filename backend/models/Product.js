const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://placehold.co/300x300'
  },
  stock: {
    type: Number,
    default: 100
  },
  rating: {
    rate: {
      type: Number,
      default: 4
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema, 'ministore');