const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

const Info = sequelize.define('Info', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'infos',
    timestamps: true,
    underscored: true
});




module.exports = Info;