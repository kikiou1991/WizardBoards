const { v4: uuidv4 } = require("uuid");
const { ObjectId: objID } = require("mongodb");

module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/users");
  app.get("/api/v2/users", async (req, res, next) => {
    try {
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      //find all users, turn them into an array
      const users = await db.collection("users").find().toArray();

      //return the users as json
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      console.error(error, "Failed to get users");
      next(error);
    }
  }),
    app.post("/api/v2/users/email", async (req, res, next) => {
      try {
        console.log("req.body", req.body);
        let { email } = req.body;
        if (!email) {
          return res.status(400).json({
            success: false,
            message: "Invalid email",
            data: null,
          });
        }
        //find the user with the email
        const user = await db.collection("users").findOne({ email: email });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
          });
        }
        //return the user
        return res.status(200).json({
          success: true,
          message: "User found successfully",
          data: user,
        });
      } catch (error) {
        console.error(error, "Failed to get user by email");
        next(error);
      }
    });
};
