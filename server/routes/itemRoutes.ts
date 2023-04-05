const router = require("express").Router();
const {getitems,additem} = require('../controllers/itemControllers');
export {};

router.get("/getitems", getitems);
router.put("/additem", additem);

module.exports = router;