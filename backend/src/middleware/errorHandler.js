// 统一错误处理中间件
const errorHandler = (err, req, res, next) => {
  // 记录错误日志
  console.error(err.stack);
  
  // 默认错误信息
  let error = {
    message: err.message || '服务器内部错误',
    statusCode: err.statusCode || 500
  };
  
  // Mongoose验证错误处理
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message).join(', ');
    error.statusCode = 400;
  }
  
  // Mongoose重复键错误处理
  if (err.code === 11000) {
    error.message = '数据已存在';
    error.statusCode = 400;
  }
  
  // Mongoose ObjectId错误处理
  if (err.name === 'CastError') {
    error.message = '资源未找到';
    error.statusCode = 404;
  }
  
  // JWT错误处理
  if (err.name === 'JsonWebTokenError') {
    error.message = '令牌无效';
    error.statusCode = 401;
  }
  
  // JWT过期错误处理
  if (err.name === 'TokenExpiredError') {
    error.message = '令牌已过期';
    error.statusCode = 401;
  }
  
  // 生产环境不返回详细的错误信息
  if (process.env.NODE_ENV === 'production') {
    error.message = '服务器内部错误';
  }
  
  // 返回错误响应
  res.status(error.statusCode).json({
    success: false,
    error: error.message
  });
};

module.exports = errorHandler;