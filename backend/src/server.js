const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { sequelize } = require('./config/database');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

// 安全和性能中间件
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');

// 创建Express应用
const app = express();

// 基础安全设置
app.use(helmet());

// 压缩响应数据
app.use(compression());

// CORS配置
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// 速率限制配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP在窗口期内最多100个请求
  message: {
    success: false,
    error: '请求过于频繁，请稍后再试'
  }
});

// 为认证接口设置更严格的速率限制
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 5, // 限制每个IP在窗口期内最多5个请求
  message: {
    success: false,
    error: '请求过于频繁，请稍后再试'
  }
});

// 应用速率限制
app.use('/api/', limiter);
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// 解析请求体
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 基础路由
app.get('/', (req, res) => {
  res.json({ message: '邪修厨房API服务' });
});

// API路由
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// 统一错误处理中间件
app.use(errorHandler);

// 同步数据库并启动服务器
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('MySQL数据库连接成功');
    // 同步数据库模型（不会删除现有数据）
    return sequelize.sync();
  })
  .then(() => {
    console.log('数据库模型同步完成');
    app.listen(PORT, () => {
      console.log(`服务器运行在端口 ${PORT}`);
    });
  })
  .catch(err => {
    console.error('数据库连接或同步失败:', err);
  });

module.exports = app;