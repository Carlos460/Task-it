const mongoose = require('mongoose');

const clipboardSchema = new mongoose.Schema({
  title: String,
  author: String,
  tasks: []
});
module.exports = mongoose.model('Clipboard', clipboardSchema);