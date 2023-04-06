const router = require("express").Router();
const {register, login, updatePfp, addReview, getReviews} = require('../controllers/userControllers');
export {};

router.post("/register", register);
router.post("/login", login);

router.post("/updatepfp", updatePfp);

router.put("/addreview", addReview);
router.get("/getreviews", getReviews);

module.exports = router;