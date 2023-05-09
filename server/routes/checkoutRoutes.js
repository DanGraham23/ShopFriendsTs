const router = require("express").Router();

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

const {checkoutItems} = require('../controllers/checkoutControllers');

router.post('/',cookieJwtAuth, checkoutItems);

module.exports = router;