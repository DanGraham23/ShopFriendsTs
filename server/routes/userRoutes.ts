const router = require("express").Router();
const {register, login} = require('../controllers/userControllers');
export {};

router.post("/register", register);
router.post("/login", login);

router.patch("/updatepfp");

module.exports = router;