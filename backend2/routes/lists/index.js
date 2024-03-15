const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/lists");
  app.get("/api/v2/lists", async (req, res, next) => {
    try {
      const boardUuid = req.query.boardUuid;
      const user = req.user;

      if (!boardUuid) {
        return res
          .status(400)
          .json({ message: "Invalid board UUID", success: false, data: null });
      }
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }

      let board = await db.collection("boards").findOne({ uuid: boardUuid });

      let boardLists = board.lists;
      let fetchedLists = [];
      for (let i = 0; i < boardLists?.length; i++) {
        let list = await db.collection("lists").findOne({ _id: boardLists[i] });
        if (list) {
          fetchedLists.push(list);
        }
      }

      return res.status(200).json({
        success: true,
        message: "Board fetched successfully",
        data: fetchedLists,
      });
    } catch (error) {
      console.error(error, "Failed to get boards");
      next(error);
    }
  });
  app.post("/api/v2/lists", async (req, res, next) => {
    const { boardUuid, data } = req.body;
    const listUUID = data.uuid;
    const user = req.user;
    if (!user || !user._id) {
      return res.status(400).json({
        message: "Invalid user information",
        success: false,
        data: null,
      });
    }
    if (!boardUuid) {
      return res
        .status(400)
        .json({ message: "Invalid board UUID", success: false, data: null });
    }
    if (listUUID) {
      //turn the string data into ObjectID
      const { _id, ...updateData } = data;
      const newIds = updateData.cards.map((card) => new ObjectId(card));
      console.log("newIds", newIds);
      let list = await db.collection("lists").findOneAndUpdate(
        { uuid: listUUID },
        {
          $set: { ...updateData, cards: newIds },
        },
        { returnDocument: "after", returnNewDocument: true }
      );
      namespace.emit("list", { type: "update", data: list });
      return res.status(200).json({
        success: true,
        message: "List updated successfully",
        data: list,
      });
    } else {
      let uuid = uuidv4();
      let list = await db
        .collection("lists")
        .insertOne(
          { ...data, board: [boardUuid], uuid },
          { returnDocument: "after", returnNewDocument: true }
        );
      let board = await db
        .collection("boards")
        .findOneAndUpdate(
          { uuid: boardUuid },
          { $push: { lists: list.insertedId } },
          { returnDocument: "after", returnNewDocument: true }
        );
      let newList = await db
        .collection("lists")
        .findOne({ _id: list.insertedId });

      namespace.emit("list", { type: "create", data: newList });

      return res.status(201).json({
        success: true,
        message: "List created successfully",
        data: newList,
      });
    }
  });
  app.post("/api/v2/lists/archive", async (req, res, next) => {
    const { boardUuid, listUUID, data } = req.body;

    const user = req.user;
    if (!user || !user._id) {
      return res.status(400).json({
        message: "Invalid user information",
        success: false,
        data: null,
      });
    }
    if (!boardUuid) {
      return res
        .status(400)
        .json({ message: "Invalid board UUID", success: false, data: null });
    }
    if (listUUID) {
      let result = await db.collection("lists").deleteOne(
        { uuid: listUUID },
        {
          returnDocument: "after",
          returnNewDocument: true,
          returnOriginal: true,
        }
      );
      let updatedBoard = await db
        .collection("boards")
        .findOneAndUpdate(
          { uuid: boardUuid },
          { $pull: { lists: result.deletedId } },
          { returnDocument: "after", returnNewDocument: true }
        );
      namespace.emit("list", { type: "delete", data: result });
      return res.status(200).json({
        success: true,
        message: "List archived successfully",
        data: result,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid list UUID", success: false, data: null });
    }
  });
};
