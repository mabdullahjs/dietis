const mongoose = require('mongoose');
const QRCode = require('qrcode');

const teamLeaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assigned: { type: Boolean, required: true },
  qrCode: { type: String } // New field for storing the QR code data
});

// Middleware to generate and save QR code when a new team leader is created
teamLeaderSchema.pre('save', async function (next) {
  // Only generate the QR code if the team leader is assigned/created
    try {
      // Generate the QR code with the team leader's name
      const qrCode = await QRCode.toDataURL(this.name);
      // Save the QR code data to the team leader document
      this.qrCode = qrCode;
    } catch (error) {
      // Handle any error that occurred during QR code generation
      console.error('Error generating QR code:', error);
      // Skip saving the QR code data if an error occurred
    }

  next();
});

module.exports = mongoose.model('TeamLeader', teamLeaderSchema);
