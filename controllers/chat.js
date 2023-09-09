const Chat = require('../models/chat');
const mongoose = require('mongoose');
const Resident = require('../models/Resident');
const TeamLeader = require('../models/teamLeader');



//get message api
const chat = async (req, res) => {
  const { id } = req.params;
  const message = await Chat.find({ _id: id });
  res.json(message);
};

//send message api

const sendMessage = async (req, res) => {
  try {
    const {
      sender,
      message,
      time,
      protocols
    } = req.body;
    const messages = await Chat.create({
      sender,
      message,
      time,
      protocols
    });
    res.json({ mssg: "message send", messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendProtocol = async (req, res) => {
  try {
    const { patientId, teamLeaderId } = req.query;
    const { protcol, message } = req.body;

    // Retrieve the patient's chat channel
    const resident = await Resident.findById(patientId);
    const teamLeader = await TeamLeader.findById(teamLeaderId);
    const chatChannel = resident.chatChannel;
    const teamleaderName = teamLeader.name;
    // Create a chat message with the protocol and chat channel
    const chatMessage = await Chat.create({
      sender: teamleaderName,
      protcol: protcol,
      message: message, // Placeholder message for the protocol
      chatChannel: chatChannel,
    });

    // Create the protocol document
    // const protocolData = {
    //   patient: patientId,
    //   teamLeader: teamLeaderId,
    //   protcol: protcol,
    // };
    // const createdProtocol = await ChatProtocol.create(protocolData);

    // Update the chat message with the protocol data
    // chatMessage.message = JSON.stringify(createdProtocol);
    await chatMessage.save();
    res.status(200).json(chatMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { chat, sendMessage, sendProtocol };