const User = require('../models/usermodel');
require("dotenv").config();
const jwt = require("jsonwebtoken");


//check if the user has access to the route by checking if the tokens match
module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}