const Patient = require('../models/Patient');
const mongoose = require('mongoose');

// post request of add Patient

const addPatient = async (req, res) => {
    try {
        const {
            name,
            morningTeam,
            afternoonTeam,
            notes,
            arrivalMorning,
            arrivalNoon,
            departId,
            TeamId
        } = req.body;
        const patient = await Patient.create({
            name,
            morningTeam,
            afternoonTeam,
            notes,
            arrivalMorning,
            arrivalNoon,
            departId,
            TeamId
        });
        res.json({ mssg: "Patient created", patient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get patient by ID
const getPatientByid = async (req, res) => {
  const { id } = req.params;
  const patients = await Patient.find({_id:id});
  res.json(patients);
};
//get all Patient
const getPatient = async (req, res) => {
    const patients = await Patient.find({});
    res.json(patients);
};

//update patient

const updatePatient = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No such Patient" });
    }

    const patient = await Patient.findOneAndUpdate(
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


//delete patient

const deletePatient = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No such patient" });
    }

    const patient = await Patient.findOneAndDelete({ _id: id });

    if (!patient) {
        return res.json({ error: "No such patient" });
    }

    res.json(patient);
};


module.exports = { addPatient, getPatient, updatePatient, deletePatient,getPatientByid };
