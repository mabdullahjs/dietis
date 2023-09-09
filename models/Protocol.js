const mongoose = require("mongoose");

const protocolSchema = new mongoose.Schema({
    button_text:{
        type: String
    },
    status_color:{
        type: String,
        emun: ['green','orange','red'],
        default: 'green'
    },
    chat_text: {
        type: String
    },
    theme_status: {
        type: String,
        enum: ['positive','indicative','triggering' , 'others'],
        default: 'positive'
    },
    preview: [mongoose.Schema.Types.Mixed]
},{
    timestamps: true
});

module.exports = mongoose.model('Protocol', protocolSchema);