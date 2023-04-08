const cartRouter = require("express").Router();
const {addItemToCart, removeItemFromCart} = require('../controllers/cartControllers');

cartRouter.put('/addcartitem', addItemToCart);
cartRouter.delete('/removecartitem', removeItemFromCart);

module.exports = cartRouter;