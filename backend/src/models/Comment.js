const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // 评论作者ID
  'author.id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'author_id'
  },
  // 评论作者用户名
  'author.username': {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'author_username'
  },
  // 评论作者等级
  'author.level': {
    type: DataTypes.STRING,
    defaultValue: '邪修学徒',
    field: 'author_level'
  },
  // 评论作者头像
  'author.avatar': {
    type: DataTypes.STRING,
    field: 'author_avatar'
  },
  // 关联的菜谱ID
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes',  // 表名，避免引用 Recipe 模型实例
      key: 'id'
    }
  },
  // 点赞数
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // 父评论ID（用于回复功能）
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',  // 自引用使用表名字符串
      key: 'id'
    }
  }
}, {
  tableName: 'comments',
  timestamps: true,
  indexes: [
    {
      fields: ['recipeId']
    },
    {
      fields: ['author_id']
    },
    {
      fields: ['parentId']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = Comment;