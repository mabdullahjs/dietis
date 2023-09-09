const mongoose = require('mongoose');

const departmentByTimeSchema = new mongoose.Schema({
    depart: [mongoose.Schema.Types.Mixed],
    date: { type: Date , default: Date.now}
});

module.exports = mongoose.model('DepartmentByTime', departmentByTimeSchema);
