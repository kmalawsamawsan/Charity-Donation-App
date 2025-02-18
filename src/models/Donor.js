const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Donor = sequelize.define('Donor', {
  DonorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Phone: {
    type: DataTypes.STRING,
  },
  RegistrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Donor;
