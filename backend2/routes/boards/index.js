const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/boards");
  app.get("/api/v2/boards", async (req, res, next) => {
    try {
      const workspaceUuid = req.query.workspaceUuid;
      const user = req.user;

      if (!workspaceUuid) {
        return res.status(400).json({
          message: "Invalid workspace ID",
          success: false,
          data: null,
        });
      }
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }

      const workspace = await db.collection("workspaces").findOne({
        uuid: workspaceUuid,
        users: { $in: [user._id] },
      });

      if (!workspace) {
        return res
          .status(400)
          .json({ message: "Workspace not found", success: false, data: null });
      }
      let thisWorksSpaceBoards = workspace.boards;
      let fetchedBoards = [];
      for (let i = 0; i < thisWorksSpaceBoards.length; i++) {
        let board = await db
          .collection("boards")
          .findOne({ _id: thisWorksSpaceBoards[i] });
        if (board) {
          fetchedBoards.push(board);
        }
      }
      return res.status(200).json({
        success: true,
        message: "Boards fetched successfully",
        data: fetchedBoards,
      });
    } catch (error) {
      console.error(error, "Failed to get boards");
      next(error);
    }
  });

  app.post("/api/v2/boards", async (req, res, next) => {
    try {
      const { data, workspaceUuid, boardUuid } = req.body;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      if (!boardUuid) {
        if (!workspaceUuid) {
          return res.status(400).json({
            message: "Invalid workspace ID",
            success: false,
            data: null,
          });
        }
        let uuid = uuidv4();
        const defaultImageLink =
          "https://images.unsplash.com/photo-1596762779387-9c681b5e2818?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        let createdBoard = await db.collection("boards").insertOne(
          {
            name: data.name,
            uuid: uuid,
            _id: uuid,
            isPublic: false,
            isStared: false,
            imageLink: defaultImageLink,
          },
          { returnOriginal: true }
        );
        let updatedWorkspace = await db
          .collection("workspaces")
          .findOneAndUpdate(
            { uuid: workspaceUuid },
            { $push: { boards: createdBoard.insertedId } },
            { returnOriginal: true }
          );
        let boardThatCreated = await db
          .collection("boards")
          .findOne({ _id: createdBoard.insertedId });
        namespace.emit("board", { type: "create", data: boardThatCreated });
        return res.status(201).json({
          message: "Board created successfully",
          success: true,
          data: boardThatCreated,
        });
      } else {
        let result = await db.collection("boards").findOneAndUpdate(
          { uuid: boardUuid },
          {
            $set: {
              ...data,
            },
          },
          { returnDocument: "after" }
        );
        console.log("Board updated successfully", result);
        namespace.emit("board", { type: "update", data: result });

        return res.status(201).json({
          message: "Board updated successfully",
          success: true,
          data: result,
        });
      }
    } catch (error) {
      console.error(error, "Failed to create board");
      next(error);
    }
  });
  app.post("/api/v2/boards/archive", async (req, res, next) => {
    try {
      const { boardUuid } = req.body;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }
      let updatedWorkspace = await db
        .collection("workspaces")
        .findOneAndUpdate(
          { boards: boardUuid },
          { $pull: { boards: boardUuid } },
          { returnOriginal: true }
        );
      let result = await db
        .collection("boards")
        .deleteOne({ uuid: boardUuid }, { returnOriginal: true });
      namespace.emit("board", { type: "delete", data: result });

      return res.status(201).json({
        message: "Board archived successfully",
        success: true,
        data: { result: result, updatedWorkspace: updatedWorkspace },
      });
    } catch (error) {
      console.error(error, "Failed to archive board");
      next(error);
    }
  });
};
