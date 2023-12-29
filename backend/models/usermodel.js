const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: true,
    },
    username: {
        type: String,
        require: [true, "Username is required"],
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
    this.password = await bcrpyt.hash(this.password, 12);
})

module.exports = mongoose.model("User", userSchema);