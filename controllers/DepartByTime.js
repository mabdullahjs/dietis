const Department = require('../models/DepartByTime');
const mongoose = require('mongoose');

// post request of add questions

const addDepartment = async (req, res) => {
    try {
        const {
            depart,
            date
        } = req.body;
        const department = await Department.create({
           depart,
           date
        });
        res.json({ mssg: "Department send ", department });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all depart
const getDepartment = async (req, res) => {
    const departments = await Department.find({});
    res.json(departments);
};

//get Depart by date
const getDepartByTime = async (req , res)=>{
  try {
    const { date } = req.query;

    const startDate = new Date(`${date}T00:00:00Z`);
    const endDate = new Date(`${date}T23:59:59Z`);

    const data = await Department.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    });

    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

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

module.exports = { addDepartment, getDepartment, updateDepart, getDepartByTime };