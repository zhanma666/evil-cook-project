const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Collect = sequelize.define('Collect', {
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
  // 菜谱ID
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'collects',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['recipeId']
    },
    {
      unique: true,
      fields: ['userId', 'recipeId']
    }
  ]
});

module.exports = Collect;