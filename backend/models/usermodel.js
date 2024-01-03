const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "You must enter a password"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    id: {
        type: String
    },
    lastSeen: {
        type: Date,

    },
    workspaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
        },
    ],
});


module.exports = mongoose.model("User", userSchema);