const router = require("express").Router();
const {getItems,addItem, removeItem} = require('../controllers/itemControllers');
export {};

router.get("/getitems", getItems);
router.put("/additem", addItem);
router.delete("/removeItem", removeItem);

module.exports = router;