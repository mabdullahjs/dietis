const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, required:true },
  members: {type: Array},
  patient: {type: Array}
});

module.exports = mongoose.model('Team', teamSchema);


