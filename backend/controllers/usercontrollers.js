const mongoose = require('mongoose');
const User = require('../models/usermodel');


module.exports.GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports.GetUserById = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.GetAuthenticatedUser = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        //if the user data is not attached
        if (!authenticatedUser) {
            return res.status(401).json({ error: "Unathorized access" })
        }

        res.json(authenticatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal Server Error" })

    }
}
