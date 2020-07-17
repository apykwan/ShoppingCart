const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { findOrders, createOrder, deleteOrder } = require('../controllers/order');

router.post("/orders", createOrder)
router.get("/orders", findOrders)
router.delete("/orders/:id", deleteOrder);

module.exports = router;