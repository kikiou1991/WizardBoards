const Board = require('../models/boardmodel.js');
const Workspace = require('../models/workspacemode.js')
const { v4: uuidv4 } = require('uuid');

module.exports.CreateBoard = async (req, res, next) => {
    try {
        const { name, workspaceUuid } = req.body;
        const user = req.user;
        //check if the user is allowed access to this api endpoint
        if (!user || !user._id) {
            return res.status(400).json({ message: 'Invalid user information' })
        }

        //check if the workspace is provided on the frontend
        if (!workspaceUuid) {
            return res.status(400).json({ message: 'Workspace UUID must be provided' })
        }
        //create uuid for the board
        let uuid = uuidv4();

        //create the board itself, using the info above
        const board = await Board.create({ name, uuid, isPublic: false });

        //Find thge workspace we need to add the board to by its UUID and push it
        const workspace = await Workspace.findOneAndUpdate(
            { uuid: workspaceUuid, users: { $in: [user._id] } }, //ensuring that the user has access to the board
            { $push: { boards: board._id } },
            { new: true } //return the modified document
        );

        //check if the workspace exists
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' })
        }
        res.status(201).json({ message: 'Board created succesfully', data: board })

    } catch (error) {
        console.error(error, 'Failed to create board')
    }
}