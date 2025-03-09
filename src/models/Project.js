const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Project = sequelize.define('Project', {
  ProjectID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
  },
  TargetAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  RaisedAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  StartDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  EndDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Project;
