const Order = require('../models/order');

exports.findOrders = async (req, res) => {
    const order = await Order.find({});
    res.send(order);
};

exports.createOrder = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
};

exports.deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
};