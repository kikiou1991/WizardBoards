
const Workspace = require('../models/workspacemode.js')


module.exports.CreateWorkspace = async (req, res, next) => {
    try {
        const { name } = req.body;
        const user = req.user;

        // Check if user or user._id is undefined
        if (!user || !user._id) {
            return res.status(400).json({ message: "Invalid user information" });
        }

        const workspace = await Workspace.create({ name, users: [user._id] });
        user.workspaces.push(workspace._id);
        await user.save();

        res.status(201).json({ message: "Workspace created successfully", workspace });
    } catch (error) {
        console.error(error, "Failed to create workspace");
        next(error);
    }
};

module.exports.GetUserWorkspace = async (req, res, next) => {
    try {
        const user = req.user;

        // Check if user or user._id is undefined
        if (!user || !user._id) {
            return res.status(400).json({ message: "Invalid user information" });
        }

        const workspaces = await Workspace.find({ users: user._id }).populate("users");

        res.status(200).json({ workspaces });
    } catch (error) {
        console.error(error, "Failed to get the user workspace");
        next(error);
    }
};
