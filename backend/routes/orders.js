const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    if (!items || !total || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
      userId: req.userId,
      items,
      total,
      shippingAddress,
      status: 'pending',
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
