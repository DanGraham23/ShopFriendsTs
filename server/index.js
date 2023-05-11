const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();
require("dotenv").config();

app.use(cors({origin:process.env.FRONTEND_HOST, credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`server connected on port:${process.env.SERVER_PORT}`);
});