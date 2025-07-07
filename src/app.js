const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 数据库连接
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// 基础路由
app.get('/', (req, res) => {
  res.send('六度后端API服务运行中');
});

// 挂载认证路由
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 挂载关系网路由
const relationRoutes = require('./routes/relation');
app.use('/api/relations', relationRoutes);

// TODO: 挂载用户、关系等路由

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 