const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

const Prestation = sequelize.define('Prestation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reparationType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    priceSuggested: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'prestations',
    timestamps: true,
    underscored: true
});


const Job = require('./jobModel');
    Job.hasMany(Prestation, {
        foreignKey: 'name_job',
    });
    Prestation.belongsTo(Job, {
        foreignKey: 'name_job',
    });



module.exports = Prestation;
