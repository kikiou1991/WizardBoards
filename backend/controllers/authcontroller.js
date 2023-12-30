const User = require('../models/usermodel');
const { createSecretToken } = require('../utils/secretToken');
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exist, please sign in" }); //check is the user already exists in the DB
        }
        const user = await User.create({ email, password, createdAt }); //if not create a new user
        const token = createSecretToken(user._id);  //create the user token
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.log(error, "Failed to signup user");
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email }); //check if the user exists
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password) //compare the passwords
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in succesfully", success: true });
        next()
    } catch (error) {
        console.error(error, "Failed to login in user");
    }
}