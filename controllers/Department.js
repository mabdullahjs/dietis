const Department = require('../models/Department');
const mongoose = require('mongoose');

// post request of add questions

const addDepartment = async (req, res) => {
    try {
        const {
            name,
            members,
            patient
        } = req.body;
        const department = await Department.create({
            name,
            members,
            patient
        });
        res.json({ mssg: "Department created", department });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all depart
const getDepartment = async (req, res) => {
    const departments = await Department.find({});
    res.json(departments);
};

//update depart

const updateDepart = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "No such Departments" });
    }
  
    const departments = await Department.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!departments) {
      return res.json({ error: "No such Depart" });
    }
  
    res.json(departments);
  };
  

  //delete department

  const deleteDepart = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "No such depart" });
    }
  
    const departs = await Department.findOneAndDelete({ _id: id });
  
    if (!departs) {
      return res.json({ error: "No such depart" });
    }
  
    res.json(departs);
  };

module.exports = { addDepartment, getDepartment, updateDepart, deleteDepart };