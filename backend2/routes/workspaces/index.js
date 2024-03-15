const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/workspaces");
  app.get("/api/v2/workspaces", async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      const workspaces = await db
        .collection("workspaces")
        .find({ users: user._id })
        .toArray();
      return res.status(200).json({
        success: true,
        message: "Workspaces fetched successfully",
        data: workspaces,
      });
    } catch (error) {
      console.error(error, "Failed to get boards");
      next(error);
    }
  });

  app.post("/api/v2/workspaces", async (req, res, next) => {
    try {
      const { data } = req.body;
      console.log("server data", data);

      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      if (data?.uuid) {
        const workspace = await db
          .collection("workspaces")
          .findOneAndUpdate(
            { uuid: data.uuid },
            { $set: { ...data } },
            { returnDocument: "after", returnNewDocument: true }
          );
        let updatedWorkspace = await db
          .collection("workspaces")
          .findOne({ uuid: data.uuid });
        namespace.emit("workspace", { type: "update", data: workspace });
        return res.status(200).json({
          success: true,
          message: "Workspace updated successfully",
          data: workspace,
        });
      } else {
        const uuid = uuidv4();
        console.log(user._id);
        const workspace = await db
          .collection("workspaces")
          .insertOne(
            { ...data, users: [user._id], uuid, _id: uuid },
            { returnDocument: "after", returnNewDocument: true }
          );
        let created = await db
          .collection("workspaces")
          .findOne({ uuid: workspace.insertedId });
        namespace.emit("workspace", { type: "create", data: created });
        console.log("created after emit", created);
        return res.status(201).json({
          success: true,
          message: "Workspace created successfully",
          data: created,
        });
      }
    } catch (error) {
      console.error(error, "Failed to create board");
      next(error);
    }
  });
  app.post("/api/v2/workspaces/archive", async (req, res, next) => {
    try {
      const { workspaceUUID } = req.body;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      if (!workspaceUUID) {
        return res.status(400).json({
          message: "Invalid workspace information",
          success: false,
          data: null,
        });
      }
      const workspace = await db
        .collection("workspaces")
        .findOne({ uuid: workspaceUUID });
      if (!workspace) {
        return res.status(400).json({
          message: "Invalid workspace information",
          success: false,
          data: null,
        });
      }
      const deletedWorkspace = await db
        .collection("workspaces")
        .findOneAndDelete(
          { uuid: workspaceUUID },
          { returnDocument: "after", returnNewDocument: true }
        );
      namespace.emit("workspace", { type: "delete", data: deletedWorkspace });
      return res.status(200).json({
        success: true,
        message: "Workspace deleted successfully",
        data: deletedWorkspace,
      });
    } catch (error) {
      console.error(error, "Failed to archive board");
      next(error);
    }
  });

  app.post("/api/v2/workspaces/user", async (req, res, next) => {
    try {
      const { workspaceUuid, userUuid } = req.body;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      if (!workspaceUuid) {
        return res.status(400).json({
          message: "Invalid workspace uuid",
          success: false,
          data: null,
        });
      }

      //add the user to the workspace.users array
      let objId = new ObjectId(userUuid);
      let updatedWorkspace = await db.collection("workspaces").findOneAndUpdate(
        {
          uuid: workspaceUuid,
        },
        { $push: { users: objId } },
        { returnOriginal: false }
      );
      //add the workspace to the user.workspaces array
      let updatedUser = await db.collection("users").findOneAndUpdate(
        {
          uuid: userUuid,
        },
        { $push: { workspaces: updatedWorkspace._id } },
        { returnOriginal: false }
      );
      namespace.emit("users", { type: "update", data: updatedUser });
      namespace.emit("workspace", { type: "update", data: updatedWorkspace });
      return res.status(200).json({
        succcess: true,
        message: "User added to workspace successfully",
        data: updatedWorkspace,
      });
    } catch (error) {
      console.error(error, "Failed to add user to workspace");
      next(error);
    }
  });
  app.get("/api/v2/workspaces/members", async (req, res, next) => {
    try {
      const { workspaceUUID } = req.query;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      if (!workspaceUUID) {
        return res.status(400).json({
          message: "Invalid workspace uuid",
          success: false,
          data: null,
        });
      }
      let thisWorkspace = await db
        .collection("workspaces")
        .findOne({ uuid: workspaceUUID });
      let workspaceUsers = thisWorkspace?.users;
      let fetchedUsers = [];
      for (let i = 0; i < workspaceUsers?.length; i++) {
        let user = await db
          .collection("users")
          .findOne({ _id: workspaceUsers[i] });
        fetchedUsers.push(user);
      }

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: fetchedUsers,
      });
    } catch (error) {
      console.error(error, "Failed to add user to workspace");
      next(error);
    }
  });
};
