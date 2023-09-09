const express = require('express');
const { addPatient, getPatient, updatePatient, deletePatient, getPatientByid } = require('../controllers/patient')

//route
const router = express.Router();

//addPatient route
router.post('/addPatient' , addPatient);

//getPatient route
router.get('/getPatient' , getPatient);

//getPatient by id route
router.get('/getPatient/:id' , getPatientByid);

//update Patient route
router.patch('/updatePatient/:id' , updatePatient);

//delete Patient route
router.delete('/deletePatient/:id' , deletePatient);

module.exports = router