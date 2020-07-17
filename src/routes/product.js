const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { findProducts, createProduct, deleteProduct }= require('../controllers/product');

router.get("/products", findProducts)
router.post("/products", auth, isAdmin, createProduct)
router.delete("/products/:id", auth, isAdmin, deleteProduct)

module.exports = router;