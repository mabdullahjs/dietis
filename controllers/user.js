const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/User');
const { transporter } = require('../utils/nodemailer');

// Register a new user
const registerUser = async (req, res) => {

  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ email, password, role, name });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user })
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate and send 2-factor authentication code
const sendTwoFactorCode = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    //match password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

  
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m'
    });

    res.status(200).json({ message: 'Login successfull'  , accessToken});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Verify 2-factor authentication code
const verifyTwoFactorCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
      window: 1
    });

    if (verified) {
      // Clear the 2-factor authentication code in the user's document
      user.twoFactorSecret = null;
      await user.save();

      // Generate access token
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
      });

      // Save the access token in a cookie
      res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });

      res.status(200).json({ message: 'Logged in successfully', accessToken });
    } else {
      res.status(400).json({ message: 'Invalid code' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfileDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { registerUser, sendTwoFactorCode, verifyTwoFactorCode, logout, getProfileDetail };