const router = require("express").Router();
const {register, login, updatepfp} = require('../controllers/userControllers');
export {};

router.post("/register", register);
router.post("/login", login);

router.post("/updatepfp", updatepfp);

module.exports = router;