const Protocol = require("../models/Protocol");

const createPortocol = async (req, res) => {
  try {
    const { button_text, status_color, chat_text, theme_status, preview } = req.body;

    const portocol = await Protocol.create({
      button_text,
      status_color,
      chat_text,
      theme_status,
      preview
    });
    res.status(201).json({
      success: true,
      data: portocol,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProtocols = async (req, res) => {
  try {
    const protocols = await Protocol.find();
    res.status(200).json({
      success: true,
      data: protocols,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProtocolsById = async (req, res) => {
  try {
    const { id } = req.params;
    const protocol = await Protocol.findById(id);
    res.status(200).json({
      success: true,
      data: protocol,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatusColor = async (req, res) => {
  const { theme_status } = req.body;
  const { id } = req.params;
  try {
    let protocol = await Protocol.findById(id);

    if (!protocol) {
      return res.status(404).json({
        success: false,
        message: "Protocol not found",
      });
    }

    let status_color;

    switch (theme_status) {
      case "positive":
        status_color = "green";
        break;
      case "indicative":
        status_color = "orange";
        break;
      case "triggering":
        status_color = "red";
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid theme_status",
        });
    }

    protocol.status_color = status_color;
    protocol.theme_status = theme_status;
    await protocol.save();

    return res.status(200).json({
      success: true,
      message: "Status color updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { createPortocol, updateStatusColor, getAllProtocols, getProtocolsById };