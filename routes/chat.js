const express = require('express');
const {chat, sendMessage, sendProtocol} = require('../controllers/chat');

//route
const router = express.Router();

//getMessage
router.get('/message/:id' , chat);

//sendMessage
// router.post('/sendMessage' , sendMessage);

router.route('/sendMessage').post(sendProtocol);

module.exports = router