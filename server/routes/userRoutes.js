const router = require("express").Router();

const {register, login, updatePfp, addReview, getUser} = require('../controllers/userControllers');

const cookieJwtAuth = require("../middleware/cookieJwtAuth");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post("/register", register);
router.post("/login", login);

router.get("/getuser/:username", getUser);

router.put("/updatepfp", cookieJwtAuth, upload.single('profile_picture'), updatePfp);
router.put("/addreview/:sender_user_id/:receiver_user_id/:rating", cookieJwtAuth, addReview);


module.exports = router;