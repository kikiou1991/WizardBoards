const User = require("../models/usermodel");
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, createdAt, fullName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exist, please sign in" }); //check is the user already exists in the DB
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      createdAt,
    }); //if not create a new user

    const token = createSecretToken(user._id); //create the user token
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: {
        email: user.email,
        fullName: user.fullName,
      },
    });
    next();
  } catch (error) {
    console.log(error, "Failed to signup user");
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }); //check if the user exists
    if (!user) {
      return res.json({ message: "No user exist with that email" });
    }
    const auth = await bcrypt.compare(password, user.password); //compare the passwords
    if (!auth) {
      return res.json({ message: "The password is incorrect" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in succesfully",
      success: true,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error, "Failed to login in user");
  }
};

module.exports.verifyToken = async (req, res) => {
  console.log("req.headers:", req.headers);
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      console.log("data:", data);
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Token verification failed",
          error: err.message,
        });
      } else {
        try {
          const user = await User.findById(data.id);
          if (user) {
            req.io.of("/auth/validate").emit("validateRes", {
              status: true,

              message: "Token verified",
              data: {
                user,
              },
            });

            return res.status(200).json({
              status: true,
              message: "Token verified",
              data: {
                user,
              },
            });
          } else {
            req.io.of("/auth/validate").emit("validateRes", {
              status: false,
              message: "User not found",
            });
            return res
              .status(404)
              .json({ status: false, message: "User not found" });
          }
        } catch (error) {
          console.error("User retrieval error:", error);
          return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
        }
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
