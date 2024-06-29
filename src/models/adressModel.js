const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');


const Adress = sequelize.define('Adress', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    streetAdress: {
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
    Country: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
}, {
    tableName: 'adresses',
    timestamps: true,
    underscored: true
});


module.exports = Adress;