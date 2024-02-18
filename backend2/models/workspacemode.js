const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  uuid: {
    type: String,
    required: true,
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board'
    }
  ]
});

module.exports = mongoose.model('Workspace', workspaceSchema);
