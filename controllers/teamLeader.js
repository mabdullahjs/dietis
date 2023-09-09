const TeamLeader = require('../models/teamLeader');
const mongoose = require('mongoose');

// post request of add teamLeader

const addTeamLeader = async (req, res) => {
    try {
        const {
            name,
            assigned
        } = req.body;
        const team = await TeamLeader.create({
            name,
            assigned
        });
        res.json({ mssg: "Team Leader created", team });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all team
const getTeamLeader = async (req, res) => {
    const team = await TeamLeader.find({});
    res.json(team);
};

//get Team by teamID
const getTeamLeaderbyTeamId = async (req, res) => {
    const { id } = req.params;
    const teams = await TeamLeader.find({ _id: id });
    res.json(teams);
};

//update team

const updateTeamLeader = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No such TeamLeader" });
    }

    const team = await TeamLeader.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!team) {
        return res.json({ error: "No such teamLeader" });
    }

    res.json(team);
};

//delete team

const deleteTeamLeader = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "No such team" });
    }

    const teams = await TeamLeader.findOneAndDelete({ _id: id });

    if (!teams) {
        return res.json({ error: "No such team" });
    }

    res.json(teams);
};

module.exports = { addTeamLeader, updateTeamLeader, getTeamLeader, deleteTeamLeader, getTeamLeaderbyTeamId }