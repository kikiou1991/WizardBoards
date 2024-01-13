const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    isStared: {
        type: Boolean,
        default: false
    }


})

module.exports = mongoose.model('Board', boardSchema);