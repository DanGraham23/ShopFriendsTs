const router = require("express").Router();

const {addItemToCart, removeItemFromCart, getCartItems} = require('../controllers/cartControllers');

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

router.put('/addcartitem/:user_id/:item_id',cookieJwtAuth, addItemToCart);

router.delete('/removecartitem/:user_id/:item_id', cookieJwtAuth, removeItemFromCart);

router.get('/getcartitems/:id', cookieJwtAuth, getCartItems);

module.exports = router;