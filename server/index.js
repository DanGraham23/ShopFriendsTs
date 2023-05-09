const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();
require("dotenv").config();

app.use(cors({origin:'http://localhost:5173', credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server connected on port:${process.env.SERVER_PORT}`);
});