require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../../utils/secretToken");
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db) => {
  app.post("/api/v2/register", async (req, res) => {
    try {
      const { email, password, fullName } = req.body;
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.json({
          message: "User already exists!",
          success: false,
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      let uuid = uuidv4();
      const defaultImageLink =
        "https://avatarfiles.alphacoders.com/324/324846.jpg";
      const createdUser = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        fullName,
        createdAt: new Date(),
        uuid: uuid,
        image: defaultImageLink,
      });
      const created = await db.collection("users").findOne({ email });
      const token = createSecretToken(createdUser._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        message: "User signed up successfully",
        success: true,
        token: token,
        data: {
          user: created,
          token: token,
        },
      });
    } catch (error) {
      console.error(error, "Failed to login in user");
    }
  });
  app.post("/api/v2/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.json({
          message: "Please provide an email",
          success: false,
          data: null,
        });
      }
      if (!password) {
        return res.json({
          message: "Please enter your password",
          success: false,
          data: null,
        });
      }
      let user = await db.collection("users").findOne({ email }); //check if the user exists
      if (!user) {
        return res.json({
          message: "No user exist with this email",
          success: false,
          data: null,
        });
      }
      const auth = await bcrypt.compare(password, user.password); //compare the passwords
      if (!auth) {
        return res.json({
          message: "The password or email is incorrect",
          success: false,
          data: null,
        });
      }
      const token = createSecretToken(user?._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        message: "User logged in succesfully",
        success: true,
        token: token,
        data: {
          user: user,
          token: token,
        },
      });
      next();
    } catch (error) {
      console.error(error, "Failed to login in user");
    }
  });
  app.post("/api/v2/validate", async (req, res) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ status: false, message: "No token provided" });
      }

      jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
          return res.status(401).json({
            status: false,
            success: false,
            message: "Token verification failed",
            error: err.message,
          });
        } else {
          try {
            let objId = new ObjectId(data.id);
            const user = await db.collection("users").findOne({ _id: objId });
            if (user) {
              return res.status(200).json({
                status: true,
                success: true,
                message: "Token verified",
                data: user,
              });
            } else {
              return res
                .status(404)
                .json({ status: false, message: "User not found here" });
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
  });
};
