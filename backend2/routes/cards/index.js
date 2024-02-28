const { v4: uuidv4 } = require("uuid");
module.exports = async (app, db, io) => {
  let namespace = io.of("/api/v2/cards");
  app.get("/api/v2/cards", async (req, res, next) => {
    try {
      const listUuid = req.query.listUuid;
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
      let fetchedCards = [];

      if (list && list.cards && list.cards.length > 0) {
        for (let i = 0; i < list.cards.length; i++) {
          let card = await db
            .collection("cards")
            .findOne({ _id: list.cards[i] });
          if (card) {
            fetchedCards.push(card);
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: "Board fetched successfully",
        data: fetchedCards,
      });
    } catch (error) {
      console.error(error, "Failed to get boards");
      next(error);
    }
  });
  app.post("/api/v2/cards", async (req, res, next) => {
    const { listUuid, data } = req.body;
    const user = req.user;
    console.log("listUuid", listUuid);
    console.log("data", data);
    if (data?.uuid) {
      let updatedCard = await db.collection("cards").findOneAndUpdate(
        { uuid: data.uuid },
        {
          $set: {
            title: data.title,
            cardIndex: data.cardIndex,
            position: data.position,
            listUuid: data.listUuid,
          },
        },
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
        const random = Math.floor(Math.random() * 10);
        return timestamp * 10 + random;
      };
      const generateCardPosition = async () => {
        const count = await db.collection("cards").countDocuments({ listUuid });
        //generate a postion based on the count
        return count + 1;
      };
      const cardIndex = generateCardIndex();
      const position = await generateCardPosition();
      let newcard = await db.collection("cards").insertOne(
        {
          ...data,
          cardIndex,
          position,
          createdAt: new Date().toISOString(),
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
  app.post("/api/v2/cards/archive", async (req, res, next) => {
    try {
      const { listUuid, cardUuid } = req.body;
      const user = req.user;

      if (!listUuid || !cardUuid) {
        return res.status(400).json({
          message: "Invalid list or card UUID",
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
      const list = await db.collection("lists").findOne({ uuid: listUuid });
      if (!list) {
        return res
          .status(400)
          .json({ message: "Invalid list UUID", success: false, data: null });
      }
      const result = await db
        .collection("cards")
        .deleteOne({ uuid: cardUuid }, { returnOriginal: true });
      if (!result) {
        return res
          .status(400)
          .json({ message: "Invalid card UUID", success: false, data: null });
      }
      namespace.emit("card", { type: "delete", data: result });

      return res.status(201).json({
        message: "Card deleted successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Failed to delete the card", error);
      next(error);
    }
  });
};
