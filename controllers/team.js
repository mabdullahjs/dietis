const Team = require('../models/Team');
const mongoose = require('mongoose');

// post request of add team

const addTeam = async (req, res) => {
  try {
    const {
      name,
      department,
      members
    } = req.body;
    const team = await Team.create({
      name,
      department,
      members,
    });
    res.json({ mssg: "Team created", team });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all team
const getTeam = async (req, res) => {
  const team = await Team.find({});
  res.json(team);
};

//get Team by ID
const getTeambyId = async (req, res) => {
  const { id } = req.params;
  const teams = await Team.find({department:id});
  res.json(teams);
};

//get Team by teamID
const getTeambyTeamId = async (req, res) => {
  const { id } = req.params;
  const teams = await Team.find({_id:id});
  res.json(teams);
};

//update team

const updateTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such Team" });
  }

  const team = await Team.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!team) {
    return res.json({ error: "No such team" });
  }

  res.json(team);
};

//delete team

const deleteTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such team" });
  }

  const teams = await Team.findOneAndDelete({ _id: id });

  if (!teams) {
    return res.json({ error: "No such team" });
  }

  res.json(teams);
};

module.exports = { addTeam, updateTeam, getTeam, deleteTeam, getTeambyId,getTeambyTeamId }