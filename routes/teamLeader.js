const express = require('express');
const { addTeamLeader, getTeamLeader, getTeamLeaderbyTeamId, updateTeamLeader, deleteTeamLeader } = require('../controllers/teamLeader')

//route
const router = express.Router();

//addTeam route
router.post('/addTeamLeader', addTeamLeader);

//getTeam route
router.get('/getTeamLeader', getTeamLeader);

//getTeamByID route
router.get('/getTeamLeader/:id' , getTeamLeaderbyTeamId);


//update team route
router.patch('/updateTeamLeader/:id', updateTeamLeader);

//delete team route
router.delete('/deleteTeamLeader/:id', deleteTeamLeader);

module.exports = router