const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const List = require('../models/listmodel.js')
const Board = require('../models/boardmodel.js')

module.exports.CreateList = async (req, res, next) => {
    try {
        //get the board uuid and name from the request body
        const { boardUuid, title } = req.body;
        const user = req.user;


        //return early if the board uuid or title is not provided
        if(!boardUuid || !title){
            return res.status(400).json({message: 'Invalid board or list title'})
        }
        //return early if the user is not logged in / authenticated

        if(!user || !user._id){
            return res.status(400).json({message: 'Invalid user information'})
        }
        let uuid = uuidv4();
        //find the board with the uuid
        const list = await List.create({title, board:[boardUuid], uuid});

        const board = await Board.findOne({uuid: boardUuid});
        board.lists.push(list._id);
        await board.save();

        
        
        res.status(201).json({message: 'List created successfully', data: list, list});
    } catch (error) {
        console.error('Error creating list: ', error.message);
        next(error);
    }
}

module.exports.GetLists = async (req, res, next) => {
    try {

        const boardUuid = req.query.boardUuid;
        const user = req.user;

        //return early for any errors related to the board uuid or user
        if(!boardUuid){
            return res.status(400).json({message: 'Invalid board ID'})
        }

        if(!user || !user._id){
            return res.status(400).json({message: 'Invalid user information'})
        }

        //find the board with the uuid
        const board = await Board.findOne({uuid: boardUuid}).populate('lists');
        console.log('board:', board)

        //return early if the board is not found
        if(!board){
            return res.status(400).json({message: 'Board not found'})
        }

        const lists = board.lists.map((list) => ({
            title: list.title,
            uuid: list.uuid,
            cards: list.cards,
        }));
        console.log('lists:', lists)
        res.status(200).json({
            succes: true,
            data: lists,
        })


    } catch (error) {
        console.error('Error getting lists: ', error.message);
        next(error);
    }
}