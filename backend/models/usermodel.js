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

    }
});

userSchema.pre("save", async function () {
    const bcrypt = require('bcrypt');

    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model("User", userSchema);