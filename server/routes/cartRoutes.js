const router = require("express").Router();

const {addItemToCart, removeItemFromCart, getCartItems} = require('../controllers/cartControllers');

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

router.put('/:user_id/:item_id',cookieJwtAuth, addItemToCart);

router.delete('/:user_id/:item_id', cookieJwtAuth, removeItemFromCart);

router.get('/:id', cookieJwtAuth, getCartItems);

module.exports = router;