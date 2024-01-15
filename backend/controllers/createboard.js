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
        const board = await Board.create({ name, uuid, isPublic: false, isStared: false });

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

module.exports.GetBoards = async (req, res, next) => {
    try {
        const workspaceUuid = req.query.workspaceUuid;
        const user = req.user;

        if (!workspaceUuid) {
            return res.status(400).json({ message: 'Invalid workspace ID' })
        }

        if (!user || !user._id) {
            return res.status(400).json({ message: 'Invalid user information' })
        }

        //find the workspac by the uuid and check if the user has access
        const workspace = await Workspace.findOne({
            uuid: workspaceUuid,
            users: { $in: [user._id] },
        });

        if (!workspace) {
            return res.status(400).json({ message: 'Workspace not found' })
        }
        //populate the boards array with the board objects
        await workspace.populate('boards').execPopulate();


        //Fetch the bards associated with the given workspace
        const boards = workspace.boards.map((board) => ({
            name: board.name,
            uuid: board.uuid,
            isPublic: board.isPublic,
            isStared: board.isStared,
        }));
        console.log('borads:',boards)
        res.status(200).json({
            succes: true,
            data: boards,
        })

    } catch (error) {
        console.error(error, 'Failed to get boards');
        next(error);
    }



}