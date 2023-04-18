const cartRouter = require("express").Router();
const {addItemToCart, removeItemFromCart, getCartItems} = require('../controllers/cartControllers');
const cartCookieJwtAuth = require("../middleware/cookieJwtAuth");

cartRouter.put('/addcartitem/:user_id/:item_id',cartCookieJwtAuth, addItemToCart);

cartRouter.delete('/removecartitem/:user_id/:item_id', cartCookieJwtAuth, removeItemFromCart);

cartRouter.get('/getcartitems/:id', cartCookieJwtAuth, getCartItems);

module.exports = cartRouter;