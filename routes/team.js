const express = require('express');
const { addTeam, updateTeam, getTeam, deleteTeam, getTeambyId, getTeambyTeamId } = require('../controllers/team')

//route
const router = express.Router();

//addTeam route
router.post('/addTeam', addTeam);

//getTeam route
router.get('/getTeam', getTeam);

//getTeamByID route
router.get('/getTeam/:id' , getTeambyId);

//getTeamByID route
router.get('/getTeamid/:id' , getTeambyTeamId);

//update team route
router.patch('/updateTeam/:id', updateTeam);

//delete team route
router.delete('/deleteTeam/:id', deleteTeam);

module.exports = router