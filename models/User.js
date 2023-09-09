const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'team leader'], required: true },
    twoFactorSecret: { type: String }
});

userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
  
    user.password = hash;
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', userSchema);
