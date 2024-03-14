const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
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
        message: "Cards fetched successfully",
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

    //we could potentially get all the data from the client
    //this can be an array of card objects
    //then we find the card we want to update we use the findOneAndUpdate method
    let cardUuid;
    if (Array.isArray(data)) {
      cardUuid = data[0].uuid;
    } else {
      cardUuid = data.uuid;
    }
    if (cardUuid && listUuid && !Array.isArray(data)) {
      // Exclude _id field from data
      const { _id, ...updateData } = data;

      let updatedCard = await db
        .collection("cards")
        .findOneAndUpdate(
          { uuid: cardUuid },
          { $set: { ...updateData, listUuid, list: [listUuid] } },
          { returnDocument: "after", returnNewDocument: true }
        );
      namespace.emit("card", { type: "update", data: updatedCard });
      let cardsId = new ObjectId(data._id);
      let updatedList = await db
        .collection("lists")
        .findOneAndUpdate({ uuid: listUuid }, { $push: { cards: cardsId } });
      console.log("updatedList", updatedList);
      namespace.emit("list", { type: "update", data: updatedList });

      return res.status(201).json({
        message: "Card updated successfully",
        success: true,
        data: updatedCard,
      });
    } else if (cardUuid) {
      console.log("updating card with listUuid", listUuid);
      //we can loop through the array and check the db for each card using their uuid
      const bulkData = data.map((card) => ({
        updateOne: {
          filter: { uuid: card.uuid },
          update: {
            $set: {
              title: card.title,
              cardIndex: card.cardIndex,
              position: card.position,
              listUuid: card.listUuid,
            },
          },
        },
      }));
      let updatedCards = await db
        .collection("cards")
        .bulkWrite(bulkData, { ordered: false, upsert: true });
      //next we want to check the updated cards and return that?

      let updatedCardsInList = await db
        .collection("lists")
        .findOne({ uuid: listUuid });
      console.log("updatedList", updatedCardsInList);
      namespace.emit("list", { type: "update", data: updatedCardsInList });
    } else {
      const generateCardIndex = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10);
        return timestamp * 10 + random;
      };
      const generateCardPosition = async () => {
        const count = await db.collection("cards").countDocuments({ listUuid });
        //generate a postion based on the count
        if (count === 0) return 1;
        else {
          return count + 1;
        }
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
          description: "",
        },
        { returnDocument: "after", returnNewDocument: true }
      );
      console.log("newcard", newcard);
      let list = await db
        .collection("lists")
        .findOneAndUpdate(
          { uuid: listUuid },
          { $push: { cards: newcard.insertedId } },
          { returnDocument: "after", returnNewDocument: true }
        );
      let createdCard = await db
        .collection("cards")
        .findOne({ _id: newcard.insertedId });

      namespace.emit("card", { type: "create", data: createdCard });

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
  }),
    app.post("/api/v2/cards/comments", async (req, res, next) => {
      try {
        const { cardUuid, comment } = req.body;
        const user = req.user;

        if (!cardUuid || !message) {
          return res.status(400).json({
            message: "Invalid card or comment",
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
        const card = await db.collection("cards").findOne({ uuid: cardUuid });
        if (!card) {
          return res
            .status(400)
            .json({ message: "Invalid card UUID", success: false, data: null });
        }
        const result = await db
          .collection("cards")
          .updateOne({ uuid: cardUuid }, { $push: { comments: comment } });
        namespace.emit("card", { type: "update", data: result });

        return res.status(201).json({
          message: "Message added successfully",
          success: true,
          data: result,
        });
      } catch (error) {
        console.error("Failed to add message to the card", error);
        next(error);
      }
    }),
    app.post("/api/v2/cards/description", async (req, res, next) => {
      try {
        const { cardUuid, description } = req.body;
        const user = req.user;

        if (!cardUuid || !description) {
          return res.status(400).json({
            message: "Invalid card or description",
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
        const card = await db.collection("cards").findOne({ uuid: cardUuid });
        if (!card) {
          return res
            .status(400)
            .json({ message: "Invalid card UUID", success: false, data: null });
        }
        const result = await db
          .collection("cards")
          .updateOne({ uuid: cardUuid }, { $set: { description } });
        const updatedCard = await db
          .collection("cards")
          .findOne({ uuid: cardUuid });
        namespace.emit("desc", { type: "update", data: updatedCard });

        return res.status(201).json({
          message: "Description added successfully",
          success: true,
          data: updatedCard,
        });
      } catch (error) {
        console.error("Failed to add description to the card", error);
        next(error);
      }
    });
};
