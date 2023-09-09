const express = require('express');
const {addDepartment , getDepartment , updateDepart, getDepartByTime} = require('../controllers/DepartByTime')

//route
const router = express.Router();

//addDepart route
router.post('/addDepartmentByTime' , addDepartment);

//getDepart route
// router.get('/getDepartmentByTime' , getDepartment);

//update depart route
router.patch('/updateDepartmentByTime/:id' , updateDepart);

//get depart by date route
router.get('/getDepartmentByTime' , getDepartByTime);

module.exports = router