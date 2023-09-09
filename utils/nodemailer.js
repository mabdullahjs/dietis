const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mabdullah32217@gmail.com',
    pass: 'jxpxvaxkfraegvdj',
  },

});