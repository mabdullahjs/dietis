const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model('Department', departmentSchema);
