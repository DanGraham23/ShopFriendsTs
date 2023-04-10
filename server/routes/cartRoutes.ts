const cartRouter = require("express").Router();
const {addItemToCart, removeItemFromCart, getCartItems} = require('../controllers/cartControllers');

cartRouter.put('/addcartitem', addItemToCart);
cartRouter.delete('/removecartitem', removeItemFromCart);
cartRouter.get('/getcartitems/:id', getCartItems);

module.exports = cartRouter;