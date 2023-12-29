const { Signup } = require('../controllers/authcontroller');
const router = require("express").Router();

router.post("/signup", Signup)

module.exports = router