const mongoose = require("mongoose");


const listSchema = new mongoose.Schema({    
    title: {
        type: String,
        required: [true, "Please enter a title"],
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    uuid: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        
    }

        
    });

    module.exports = mongoose.model("List", listSchema);