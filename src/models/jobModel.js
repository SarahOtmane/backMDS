const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');

const Job = sequelize.define('Job', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
}, {
    tableName: 'jobs',
    timestamps: true,
    underscored: true
});



module.exports = Job;