const Workspace = require('../models/workspacemode.js');
const { v4: uuidv4 } = require('uuid');

module.exports.CreateWorkspace = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;

    // Check if user or user._id is undefined
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }
    //create a uuid for the workspace
    let uuid = uuidv4();

    const workspace = await Workspace.create({ name, users: [user._id], uuid });
    user.workspaces.push(workspace._id);
    await user.save();

    res.status(201).json({ message: 'Workspace created successfully', data: workspace, workspace });
  } catch (error) {
    console.error(error, 'Failed to create workspace');
    next(error);
  }
};

module.exports.GetUserWorkspace = async (req, res, next) => {
  try {
    const user = req.user;

    // Check if user or user._id is undefined
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }

    const workspaces = await Workspace.find({ users: user._id }).populate('users');

    res.status(200).json({
      success: true,
      data: workspaces,
      workspaces,
    });
  } catch (error) {
    console.error(error, 'Failed to get the user workspace');
    next(error);
  }
};
module.exports.GetWorkspace = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user information' });
    }
    let workspaceID = req.params.workspaceID;
    if (!workspaceID) {
      return res.status(400).json({ success: false, message: 'Invalid workspace ID' });
    }


    const workspace = await Workspace.findOne({ uuid: workspaceID }).populate('users');

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    console.error(error, 'Failed to get the user workspace');
    next(error);
  }
};
