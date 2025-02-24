const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Donor = require('./Donor');
const Project = require('./Project');

const Donation = sequelize.define('Donation', {
  DonationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DonorID: {
    type: DataTypes.INTEGER,
    references: {
      model: Donor,
      key: 'DonorID',
    },
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'ProjectID',
    },
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  DonationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Donation;
