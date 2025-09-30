const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 用户ID
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // 菜谱ID（可以为空，如果点赞的是评论）
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // 评论ID（可以为空，如果点赞的是菜谱）
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'likes',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['recipeId']
    },
    {
      fields: ['commentId']
    },
    {
      unique: true,
      fields: ['userId', 'recipeId', 'commentId']
    }
  ]
});

module.exports = Like;