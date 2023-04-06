const router = require("express").Router();
const {getItems,addItem} = require('../controllers/itemControllers');
export {};

router.get("/getitems", getItems);
router.put("/additem", addItem);

module.exports = router;