const express = require("express");

const connectDB = require('./config/db');
const productRoute = require('./src/routes/product');
const orderRoute = require('./src/routes/order');
const uploadRoute = require('./src/routes/upload');
const userRoute = require('./src/routes/user');

connectDB();

const app = express();

app.use(express.json());
app.use("/", express.static(__dirname + "/build"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', uploadRoute);
app.use('/api', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`serve at ${port}`));