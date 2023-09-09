const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  morningTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  afternoonTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  departId: { type: mongoose.Schema.Types.ObjectId },
  TeamId: { type: mongoose.Schema.Types.ObjectId },
  notes: { type: String },
  arrivalMorning: { type: Boolean },
  arrivalNoon: { type: Boolean }
});

module.exports = mongoose.model('Patient', patientSchema);