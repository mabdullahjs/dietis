const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  ahvNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  assignedSupervisor: {
    type: String,
    required: true,
  },
  illness: {
    type: String,
    required: true,
  },
  civilStatus: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  etc: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  roomRegistration: {
    type: String,
    required:true
  },
  chatChannel: {
    type: String,
    // required: true,
    unique: true,
  },
  arrivalMorning: { type: Boolean },
  arrivalNoon: { type: Boolean },
  assigned: { type: Boolean },
  note: { type: String },
  status: { type: Number },
  assigned:{type:Boolean , default:false}
});

module.exports = mongoose.model('Resident', residentSchema);
