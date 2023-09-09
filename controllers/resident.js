const { default: mongoose } = require("mongoose");
const Resident = require("../models/Resident");
const Chat = require("../models/chat");



//create resident 
const createResident = async (req, res) => {
  try {
    const { firstName, lastName, contactPerson, ahvNumber, assignedSupervisor, illness, civilStatus, allergies, etc, comment, roomRegistration, status, assigned } = req.body;
    const resident = new Resident({ firstName, lastName, contactPerson, ahvNumber, assignedSupervisor, illness, civilStatus, allergies, etc, comment, roomRegistration, status, assigned });

    // Save the resident patient
    await resident.save();

    // Create a chat channel for the patient using the patient's ID
    const chatChannel = `/${resident._id}`;

    // Update the resident patient's chatChannel field with the created chat channel
    resident.chatChannel = chatChannel;
    await resident.save();

    res.status(201).json(resident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//get resident by ID
const getResidentByid = async (req, res) => {
  const { id } = req.params;
  const patients = await Resident.find({ _id: id });
  res.json(patients);
};
//get all Resident
const getResident = async (req, res) => {
  const patients = await Resident.find({});
  res.json(patients);
};

//update Resident

const updateResident = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such Patient" });
  }

  const patient = await Resident.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!patient) {
    return res.json({ error: "No such Depart" });
  }

  res.json(patient);
};


//delete Resident

const deleteResident = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such patient" });
  }

  const patient = await Resident.findOneAndDelete({ _id: id });

  if (!patient) {
    return res.json({ error: "No such patient" });
  }

  res.json(patient);
};



const getProtocolsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Retrieve the resident patient
    const resident = await Resident.findById(patientId);

    if (!resident) {
      return res.status(404).json({ error: 'Resident patient not found' });
    }

    // Retrieve all chats for the resident's chat channel
    const chats = await Chat.find({ chatChannel: resident.chatChannel });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chats for the resident patient' });
  }
};


module.exports = { createResident, getResidentByid, getResidentByid,updateResident,getResident, getProtocolsByPatient, deleteResident};