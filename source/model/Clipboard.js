const mongoose = require('mongoose');

const clipboardSchema = new mongoose.Schema({
    title: String,
    author: String,
    tasks: [{
        text: String,
        require: true
    }]
});

module.exports = mongoose.model('Clipboard', clipboardSchema);