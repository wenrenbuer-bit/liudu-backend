const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 加密存储
  nickname: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema); 