const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('charity_platform', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
