const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Card = require('../models/cardmodel.js');
const List = require('../models/listmodel.js');

module.exports.CreateCard = async (req, res, next) => {
    try {
        // Get the list uuid and the title of the created card
        const { listUuid, title } = req.body;
        const user = req.user;

        // Return early if the list uuid or title is not provided
        if (!listUuid) {
            return res.status(400).json({ message: 'Invalid list id' });
        }
        if (!title) {
            return res.status(400).json({ message: 'Invalid card title' });
        }
        if(!user) {
            return res.status(400).json({ message: 'Invalid user information' });
        }
         // Rando card index generator for later
              const generateCardIndex = () => {
                const timestamp = new Date().getTime();
                const random = Math.floor(Math.random() * 10); // You can adjust the range as needed
                return `${timestamp}${random}`;
              };
              const cardIndex = generateCardIndex();
              console.log('This is the cardIndex: ', cardIndex);

        // Create a uuid for the card
        let uuid = uuidv4();

        // Create the card with the title, list uuid, and the uuid
        const card = await Card.create({ title, list: [listUuid], uuid, cardIndex, listUuid });

        // Find the list with the uuid
        const list = await List.findOne({ uuid: listUuid });
        // Add the card to the list
        list.cards.push(card._id);

        // Save the list
        await list.save();

        // Return the card as a response
        res.status(201).json({ message: 'Card created successfully', data: card, card });
    } catch (error) {
        console.error('Error creating card: ', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Find all of the cards within the given list

module.exports.GetCards = async(req,res,next) => {
    try {
        const listUuid = req.query.listUuid;
        const user = req.user;

        if(!listUuid){
            return res.status(400).json({message: 'Invalid list'})
        }

        if(!user || !user._id){
            return res.status(400).json({message: 'Invalid user information'})
        }

        const list = await List.findOne({uuid: listUuid}).populate('cards');
        const cards = list.cards.map((card) => ({
            title: card.title,
            uuid: card.uuid,
            description: card.description,
            comments: card.comments,
            cardIndex: card.cardIndex,
            listUuid: card.listUuid,
        }));

        res.status(200).json({
            succes: true,
            data: cards,
        })

    } catch (error) {
        console.error('Error getting cards: ', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};

// Find and delete the card with the uuid

module.exports.DeleteCard = async(req,res,next) => {
    try {
        const { listUuid, cardUuid } = req.body;
        const user = req.user;

        if(!cardUuid){
            return res.status(400).json({message: 'Invalid card'})
        }

        if(!user || !user._id){
            return res.status(400).json({message: 'Invalid user information'})
        }   
        const list = await List.findOne({uuid: listUuid});

        if(!list){
            return res.status(400).json({message: 'List not found'})
        }

        const card = await Card.findOneAndDelete({uuid: cardUuid});

        return res.status(200).json({message: 'Card deleted successfully', data: card})
    } catch (error) {
        console.error('Error deleting card: ', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
}