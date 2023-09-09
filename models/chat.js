const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    protcol: { type: String, required: true },
    message: { type: String, required: true },
    chatChannel: { type: String, required: true },
    protocols: {
        type: String,
        emun: ['punctual', 'abstinent', 'toolate'],
        default: 'punctual'
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);