const userRouter = require("express").Router();
const {register, login, updatePfp, addReview, getUser} = require('../controllers/userControllers');
export {};

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/getuser/:username", getUser);
userRouter.post("/updatepfp", updatePfp);

userRouter.put("/addreview", addReview);


module.exports = userRouter;