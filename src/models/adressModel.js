const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'addresses',
    timestamps: true,
    underscored: true
});

module.exports = Address;
