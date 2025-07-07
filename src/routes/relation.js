const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relationController');
const jwt = require('jsonwebtoken');

// 鉴权中间件
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '未登录' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: '无效token' });
  }
}

router.use(auth);

router.post('/', relationController.create);
router.get('/', relationController.list);
router.put('/:id', relationController.update);
router.delete('/:id', relationController.remove);

module.exports = router; 