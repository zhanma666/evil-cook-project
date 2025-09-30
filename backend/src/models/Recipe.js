const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  // 作者信息（扁平化存储）
  'author.id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'author_id'
  },
  'author.username': {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'author_username'
  },
  'author.level': {
    type: DataTypes.STRING,
    defaultValue: '邪修学徒',
    field: 'author_level'
  },
  'author.avatar': {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    },
    field: 'author_avatar'
  },
  // 封面图
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    },
    field: 'cover_image'
  },
  // 元数据（扁平化存储）
  'metadata.cookingTime': {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'cooking_time'
  },
  'metadata.difficulty': {
    type: DataTypes.STRING,
    defaultValue: '简单',
    field: 'difficulty'
  },
  'metadata.costLevel': {
    type: DataTypes.STRING,
    defaultValue: '低',
    field: 'cost_level'
  },
  'metadata.servings': {
    type: DataTypes.STRING,
    defaultValue: '1人份',
    field: 'servings'
  },
  // 标签
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  // 安全等级
  safetyLevel: {
    type: DataTypes.STRING,
    defaultValue: '安全',
    field: 'safety_level'
  },
  // 材料清单
  materials: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  // 制作步骤
  steps: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  // 点赞数
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // 收藏数
  collects: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // 评分
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  // 评分人数
  ratingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'rating_cnt'
  },
  // 季节性推荐
  season: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['spring', 'summer', 'autumn', 'winter']]
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['author_id']
    },
    {
      fields: ['season']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = Recipe;