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
      //convert the workspace ids to strings instead of the objectIds
      // const modifiedUsers = users.map((user) => {
      //   if (user.workspaces) {
      //     user.workspaces = user.workspaces.map((workspace) => {
      //       if (workspace instanceof objID) {
      //         return workspace.toString();
      //       }
      //       return workspace;
      //     });
      //   }
      //   return user;
      // });

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
  });
};
