const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/cards");
  app.get("/api/v2/cards", async (req, res, next) => {
    console.log("fetching the cards on the server side for testing");
    try {
      const listUuid = req.query.listUuid;
      console.log("listUuid", listUuid);
      const user = req.user;

      if (!listUuid) {
        return res
          .status(400)
          .json({ message: "Invalid list UUID", success: false, data: null });
      }
      if (!user || !user._id) {
        return res.status(400).json({
          message: "Invalid user information",
          success: false,
          data: null,
        });
      }

      let list = await db.collection("lists").findOne({ uuid: listUuid });
      const cards = list.cards.map((card) => ({
        title: card.title,
        uuid: card.uuid,
        description: card.description,
        comments: card.comments,
        cardIndex: card.cardIndex,
        listUuid: card.listUuid,
      }));

      return res.status(200).json({
        success: true,
        message: "Board fetched successfully",
        data: cards,
      });
    } catch (error) {
      console.error(error, "Failed to get boards");
      next(error);
    }
  });
  app.post("/api/v2/cards", async (req, res, next) => {
    const { listUuid, data } = req.body;
    const user = req.user;

    if (data?.uuid) {
      let updatedCard = await db
        .collection("cards")
        .findOneAndUpdate(
          { uuid: data.uuid },
          { $set: { ...data } },
          { returnDocument: "after", returnNewDocument: true }
        );
      namespace.emit("card", { type: "update", data: updatedCard });
      return res.status(200).json({
        success: true,
        message: "Card updated successfully",
        data: updatedCard,
      });
    } else {
      const generateCardIndex = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10); // You can adjust the range as needed
        return `${timestamp}${random}`;
      };
      const cardIndex = generateCardIndex();
      let newcard = await db.collection("cards").insertOne(
        {
          ...data,
          cardIndex,
          listUuid: listUuid,
          list: [listUuid],
          uuid: uuidv4(),
        },
        { returnDocument: "after", returnNewDocument: true }
      );
      let list = await db
        .collection("lists")
        .findOneAndUpdate(
          { uuid: listUuid },
          { $push: { cards: newcard.insertedId } },
          { returnDocument: "after", returnNewDocument: true }
        );
      return res.status(201).json({
        message: "Card created successfully",
        success: true,
        data: newcard,
      });
    }
  });
};
