const router = require("express").Router();

const {getItems,addItem, removeItem} = require('../controllers/itemControllers');

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get("/:user_id/:tag", getItems);

router.put("/",cookieJwtAuth,  upload.single('item_image'), addItem);

router.delete("/:id",cookieJwtAuth, removeItem);

module.exports = router;