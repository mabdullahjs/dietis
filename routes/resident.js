const express = require('express');
const { createResident, getResident, updateResident, deleteResident, getResidentByid, getProtocolsByPatient } = require('../controllers/resident');

const router = express.Router();

//add Patient route
router.route('/resident-registeration').post(createResident);

//getPatient route
router.get('/getPatient' , getResident);

//getPatient by id route
router.get('/getPatient/:id' , getResidentByid);
router.route('/protocols/:patientId').get(getProtocolsByPatient)

//update Patient route
router.patch('/updatePatient/:id' , updateResident);

//delete Patient route
router.delete('/deletePatient/:id' , deleteResident);

module.exports = router;