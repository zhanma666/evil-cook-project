const { Sequelize } = require('sequelize');
require('dotenv').config();

// 创建Sequelize实例，配置连接池
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false, // 设置为true可以查看SQL日志
  pool: {
    max: 20,        // 连接池最大连接数
    min: 5,         // 连接池最小连接数
    idle: 30000,    // 连接最大空闲时间(毫秒)
    acquire: 60000, // 连接池获取连接的超时时间(毫秒)
    evict: 1000     // 连接池清理空闲连接的时间间隔(毫秒)
  },
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: false
    } : false
  },
  retry: {
    max: 3 // 连接失败时重试次数
  }
});

module.exports = { sequelize };