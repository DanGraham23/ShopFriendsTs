const userRouter = require("express").Router();
const {register, login, updatePfp, addReview, getReviews} = require('../controllers/userControllers');
export {};

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.post("/updatepfp", updatePfp);

userRouter.put("/addreview", addReview);
userRouter.get("/getreviews", getReviews);

module.exports = userRouter;