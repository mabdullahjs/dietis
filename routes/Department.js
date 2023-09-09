const express = require('express');
const {addDepartment , getDepartment , updateDepart, deleteDepart} = require('../controllers/Department')

//route
const router = express.Router();

//addDepart route
router.post('/addDepartment' , addDepartment);

//getDepart route
router.get('/getDepartment' , getDepartment);

//update depart route
router.patch('/updateDepartment/:id' , updateDepart);

//delete depart route
router.delete('/deleteDepartment/:id' , deleteDepart);

module.exports = router