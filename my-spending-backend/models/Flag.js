const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Flag', FlagSchema);
