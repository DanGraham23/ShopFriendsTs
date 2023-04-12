const itemRouter = require("express").Router();
const {getItems,addItem, removeItem} = require('../controllers/itemControllers');
export {};

itemRouter.get("/getitems/:user_id/:tag", getItems);
itemRouter.put("/additem", addItem);
itemRouter.delete("/removeItem", removeItem);

module.exports = itemRouter;