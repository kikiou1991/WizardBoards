const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/users");
  app.get("/api/v2/users", async (req, res, next) => {
    try {
      const { workspaceUuid } = req.body;
      const user = req.user;

      if (!workspaceUuid) {
        return res.status(400).json({
          message:
            "Invalid workspace uuid, please provide a valid workspace uuid",
          success: false,
          data: null,
        });
      }

      const users = await db
        .collection("users")
        .find({ workspaces: workspaceUuid })
        .toArray();

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
