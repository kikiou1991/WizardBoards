const { Signup, Login } = require('../controllers/authcontroller');
const { userVerification } = require('../middlewares/authmiddleware');
const router = require("express").Router();

router.post("/api/signup", Signup)
router.post("/api/login", Login)
router.post("/api/", userVerification)

module.exports = router