const userRouter = require("express").Router();
const {register, login, updatePfp, addReview, getUser} = require('../controllers/userControllers');
const userCookieJwtAuth = require("../middleware/cookieJwtAuth");
export {};

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/getuser/:username", getUser);
userRouter.post("/updatepfp", userCookieJwtAuth, upload.single('profile_picture'), updatePfp);

userRouter.put("/addreview/:sender_user_id/:receiver_user_id/:rating", userCookieJwtAuth, addReview);


module.exports = userRouter;