const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/users");
  app.get("/api/v2/users", async (req, res, next) => {
    try {
      const workspaceUuid = req.query.workspaceUuid;
      const user = req.user;
      if (!workspaceUuid) {
        return res.status(400).json({
          message:
            "Invalid workspace uuid, please provide a valid workspace uuid",
          success: false,
          data: null,
        });
      }

      const workspace = await db
        .collection("workspaces")
        .findOne({ uuid: workspaceUuid });

      const workspaceId = workspace._id;
      console.log("workspaceId", workspaceId);
      const users = await db
        .collection("users")
        .find({ workspaces: workspaceId });

      const result = [];
      await users.forEach((user) => {
        result.push(user);
      });

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error(error, "Failed to get users");
      next(error);
    }
  });
};
