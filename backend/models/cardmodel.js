const mongoose = require('mongoose');  

const cardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please enter a title"],
    },
    description: {
        type: String,
    },    
        
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
    },
    cardIndex: {
        type: Number,
    },
    listUuid: {
        type: String,
    },
});
   
module.exports = mongoose.model('Card', cardSchema);