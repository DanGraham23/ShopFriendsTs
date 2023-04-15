const itemRouter = require("express").Router();
const {getItems,addItem, removeItem} = require('../controllers/itemControllers');
export {};
const multer = require('multer');
const itemCookieJwtAuth = require("../middleware/cookieJwtAuth");

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

itemRouter.get("/getitems/:user_id/:tag", getItems);
itemRouter.put("/additem",itemCookieJwtAuth,  upload.single('item_image'), addItem);
itemRouter.delete("/removeitem/:id",itemCookieJwtAuth, removeItem);

module.exports = itemRouter;