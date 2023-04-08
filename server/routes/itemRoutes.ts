const itemRouter = require("express").Router();
const {getItems,addItem, removeItem} = require('../controllers/itemControllers');
export {};

itemRouter.get("/getitems", getItems);
itemRouter.put("/additem", addItem);
itemRouter.delete("/removeItem", removeItem);

module.exports = itemRouter;