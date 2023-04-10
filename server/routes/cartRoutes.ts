const cartRouter = require("express").Router();
const {addItemToCart, removeItemFromCart, getCartItems} = require('../controllers/cartControllers');

cartRouter.put('/addcartitem/:user_id/:item_id', addItemToCart);
cartRouter.delete('/removecartitem/:user_id/:item_id', removeItemFromCart);
cartRouter.get('/getcartitems/:id', getCartItems);

module.exports = cartRouter;