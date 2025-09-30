const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// 生成JWT令牌
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// 用户注册
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // 检查必填字段
    if (!username || !email || !password) {
      const error = new Error('请提供用户名、邮箱和密码');
      error.statusCode = 400;
      throw error;
    }
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });
    
    if (existingUser) {
      const error = new Error('用户已存在');
      error.statusCode = 400;
      throw error;
    }
    
    // 创建新用户
    const user = await User.create({
      username,
      email,
      password
    });
    
    // 生成令牌
    const token = generateToken(user.id);
    
    // 设置HttpOnly Cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000 // 30天
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 生产环境使用HTTPS
      sameSite: 'strict'
    };
    
    res.cookie('token', token, cookieOptions);
    
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level
      }
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // 检查必填字段
    if (!email || !password) {
      const error = new Error('请提供邮箱和密码');
      error.statusCode = 400;
      throw error;
    }
    
    // 查找用户
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      const error = new Error('用户不存在');
      error.statusCode = 401;
      throw error;
    }
    
    // 验证密码
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      const error = new Error('密码错误');
      error.statusCode = 401;
      throw error;
    }
    
    // 生成令牌
    const token = generateToken(user.id);
    
    // 设置HttpOnly Cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000 // 30天
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 生产环境使用HTTPS
      sameSite: 'strict'
    };
    
    res.cookie('token', token, cookieOptions);
    
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户信息
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      const error = new Error('用户未找到');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        experience: user.experience,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// 用户登出
exports.logout = async (req, res, next) => {
  try {
    // 清除cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // 10秒后过期
      httpOnly: true
    });
    
    res.status(200).json({
      success: true,
      message: '登出成功'
    });
  } catch (error) {
    next(error);
  }
};