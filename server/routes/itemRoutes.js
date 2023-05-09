const router = require("express").Router();

const {getItems,addItem, removeItem} = require('../controllers/itemControllers');

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get("/getitems/:user_id/:tag", getItems);

router.put("/additem",cookieJwtAuth,  upload.single('item_image'), addItem);

router.delete("/removeitem/:id",cookieJwtAuth, removeItem);

module.exports = router;