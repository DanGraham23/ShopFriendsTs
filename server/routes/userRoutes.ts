const userRouter = require("express").Router();
const {register, login, updatePfp, addReview, getUser} = require('../controllers/userControllers');
export {};

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/getuser/:username", getUser);
userRouter.post("/updatepfp", updatePfp);

userRouter.put("/addreview/:sender_user_id/:receiver_user_id/:rating", addReview);


module.exports = userRouter;