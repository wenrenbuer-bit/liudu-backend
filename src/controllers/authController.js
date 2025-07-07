const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const JWT_SECRET = process.env.JWT_SECRET;

// 模拟验证码（实际生产应接入短信服务）
const mockCode = '123456';

exports.register = async (req, res) => {
  const { phone, password, code, nickname } = req.body;
  if (!phone || !password || !code) {
    return res.status(400).json({ message: '手机号、密码、验证码必填' });
  }
  if (code !== mockCode) {
    return res.status(400).json({ message: '验证码错误' });
  }
  const exist = await User.findOne({ phone });
  if (exist) {
    return res.status(400).json({ message: '手机号已注册' });
  }
  const hash = await bcrypt.hash(password, 10);
  const isAdmin = phone === ADMIN_PHONE;
  const user = new User({ phone, password: hash, nickname, isAdmin });
  await user.save();
  res.json({ message: '注册成功' });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: '手机号和密码必填' });
  }
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(400).json({ message: '用户不存在' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: '密码错误' });
  }
  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { phone: user.phone, nickname: user.nickname, isAdmin: user.isAdmin } });
};

// 验证码模拟接口
exports.sendCode = async (req, res) => {
  // 实际应调用短信服务，这里直接返回模拟码
  res.json({ code: mockCode, message: '验证码已发送（测试环境）' });
}; 