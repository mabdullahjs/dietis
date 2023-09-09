const express = require('express');
const { createPortocol, updateStatusColor, getProtocolsById, getAllProtocols } = require('../controllers/protocol');
const router = express.Router();

router.route('/protocol').post(createPortocol)
.get(getAllProtocols);
router.route('/protocol/:id')
.get(getProtocolsById)
.put(updateStatusColor);


module.exports = router;