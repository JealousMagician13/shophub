const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Cart is stored in localStorage on frontend, this is for reference
// In production, you might want to store cart in database

// Validate cart items and get current prices
router.post('/validate', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid cart items' });
    }

    let validatedItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const itemTotal = product.price * item.quantity;
        validatedItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal,
        });
        total += itemTotal;
      }
    }

    res.json({
      items: validatedItems,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
