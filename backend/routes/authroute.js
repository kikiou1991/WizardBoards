const { Signup, Login } = require('../controllers/authcontroller');
const { userVerification } = require('../middlewares/authmiddleware');
const router = require("express").Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/", userVerification)

module.exports = router