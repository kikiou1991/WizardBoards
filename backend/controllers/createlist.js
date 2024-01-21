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
    }
}