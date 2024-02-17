const Board = require('../models/boardmodel.js');
const Workspace = require('../models/workspacemode.js');
const { v4: uuidv4 } = require('uuid');

module.exports.CreateBoard = async (req, res, next) => {
  try {
    const { name, workspaceUuid } = req.body;
    const user = req.user;
    //check if the user is allowed access to this api endpoint
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }

    //check if the workspace is provided on the frontend
    if (!workspaceUuid) {
      return res.status(400).json({ message: 'Workspace UUID must be provided' });
    }
    //create uuid for the board
    let uuid = uuidv4();

    //create the board itself, using the info above
    const defaultImageLink =
      'https://media.istockphoto.com/id/1573618010/hu/fot%C3%B3/a-vas%C3%BAti-viadukt-%C3%A9s-g%C5%91zmozdony-a-sk%C3%B3ciai-glenfinnanban-amely-a-harry-potter-filmben-volt.jpg?s=1024x1024&w=is&k=20&c=H9wL1Zk0KIR_FIIQupkeDNMdrysv3Mcq9IsqJmhDBrE=';
    const board = await Board.create({ name, uuid, isPublic: false, isStared: false, imageLink: defaultImageLink });

    //Find the workspace we need to add the board to by its UUID and push it
    const workspace = await Workspace.findOneAndUpdate(
      { uuid: workspaceUuid },
      { $push: { boards: board._id } }, // Add the newly created board's id to the boards array
      { new: true }
    );

    //check if the workspace exists
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.status(201).json({ message: 'Board created succesfully', data: board });
  } catch (error) {
    console.error(error, 'Failed to create board');
  }
};

module.exports.GetBoards = async (req, res, next) => {
  try {
    const workspaceUuid = req.query.workspaceUuid;
    const user = req.user;

    if (!workspaceUuid) {
      return res.status(400).json({ message: 'Invalid workspace ID' });
    }

    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }

    //find the workspac by the uuid and check if the user has access
    const workspace = await Workspace.findOne({
      uuid: workspaceUuid,
      users: { $in: [user._id] },
    });

    if (!workspace) {
      return res.status(400).json({ message: 'Workspace not found' });
    }
    //populate the boards array with the board objects
    await workspace.populate('boards');

    //Fetch the bards associated with the given workspace
    const boards = workspace.boards.map((board) => ({
      name: board.name,
      uuid: board.uuid,
      isPublic: board.isPublic,
      isStared: board.isStared,
      imageLink: board.imageLink,
    }));
    console.log('boards:', boards);
    res.status(200).json({
      succes: true,
      data: boards,
    });
  } catch (error) {
    console.error(error, 'Failed to get boards');
    next(error);
  }
};
// Logic for createing new boards
module.exports.DeleteBoard = async (req, res, next) => {
  try {
    const { workspaceUuid, boardUuid, board_id } = req.body;
    const user = req.user;
    //check if the workspace and board uuid is provided
    if (!boardUuid || !workspaceUuid) {
      return res.status(400).json({ message: 'Invalid board or workspace ID' });
    }
    //check if the user is allowed access to this api endpoint
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }

    //find the workspace by the uuid and check if the user has access
    const workspace = await Workspace.findOneAndUpdate(
      {
        uuid: workspaceUuid,
        users: { $in: [user._id] },
      },
      { $pull: { boards: board_id } },
      { new: true }
    );
    //throw an error if the workspace is not found
    if (!workspace) {
      return res.status(400).json({ message: 'Workspace not found' });
    }

    //delete the board itself
    await Board.findOneAndDelete({ uuid: boardUuid });

    res.status(200).json({
      succes: true,
      message: 'Board deleted succesfully',
    });
  } catch (error) {
    console.error(error, 'Failed to delete board');
    next(error);
  }
};

module.exports.UpdateBoard = async (req, res, next) => {
  console.log('req.body on the server side:', req);
  try {
    const boardUuid = req.query.boardUuid;
    const { name, isStared } = req.body;

    const updateFields = { isStared }; // Initialize with required field

    // Check if name is provided and add it to the updateFields if true
    if (name) {
      updateFields.name = name;
    }

    const updatedBoard = await Board.findOneAndUpdate({ uuid: boardUuid }, { $set: updateFields }, { new: true });

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json({
      success: true,
      data: updatedBoard,
    });
  } catch (error) {
    console.error('Error updating board:', error);
    next(error);
  }
};
