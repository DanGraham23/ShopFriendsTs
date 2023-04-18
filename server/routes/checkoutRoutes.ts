const checkoutRouter = require("express").Router();
const checkoutCookieJwtAuth = require("../middleware/cookieJwtAuth");
const {checkoutItems} = require('../controllers/checkoutControllers');

checkoutRouter.post('/create-checkout-session',checkoutCookieJwtAuth, checkoutItems);

module.exports = checkoutRouter;