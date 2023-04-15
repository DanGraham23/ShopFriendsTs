const itemRouter = require("express").Router();
const {getItems,addItem, removeItem} = require('../controllers/itemControllers');
export {};
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

itemRouter.get("/getitems/:user_id/:tag", getItems);
itemRouter.put("/additem", upload.single('item_image'), addItem);
itemRouter.delete("/removeitem/:id", removeItem);

module.exports = itemRouter;