const User = require('../models/usermodel');
const { createSecretToken } = require('../utils/secretToken');
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exist, pleas Sign In" });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", succes: true, user });
        next();
    } catch (error) {
        console.log(error);
    }
}