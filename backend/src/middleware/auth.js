const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  // 检查请求头中是否有Bearer令牌
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 获取令牌
      token = req.headers.authorization.split(' ')[1];
      
      // 验证令牌
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 获取用户信息（不包括密码）
      req.user = await User.findByPk(decoded.id);
      
      // 检查用户是否存在
      if (!req.user) {
        return res.status(401).json({ error: '用户不存在' });
      }
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: '令牌无效' });
    }
  }
  
  if (!token) {
    res.status(401).json({ error: '未授权，无令牌' });
  }
};

module.exports = { protect };