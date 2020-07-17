const mongoose = require('mongoose');
const shortid = require("shortid");

const productSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: { type: Number },
    availableSizes: [String],
    stock: Number
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;