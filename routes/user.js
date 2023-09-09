const express = require('express');
const { registerUser, sendTwoFactorCode, verifyTwoFactorCode, logout, getProfileDetail } = require('../controllers/user');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login/two-factor/send-code').post(sendTwoFactorCode);
router.route('/login/two-factor/verify-code').post(verifyTwoFactorCode);
router.route('/me').get(isAuthenticated , getProfileDetail);
router.route('/logout').get(logout);
module.exports = router;