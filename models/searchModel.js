const { Sequelize, DataTypes, Deferrable } = require('sequelize');
const User = require('./userModel');
const database = require('../db');

const Search = database.define('search', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
      },
    
});

module.exports = Search;