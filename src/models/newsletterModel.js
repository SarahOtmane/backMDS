const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');


const Newsletter = sequelize.define('Newsletter', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
}, {
    tableName: 'newsletters',
    timestamps: true,
    underscored: true
});



module.exports = Newsletter;