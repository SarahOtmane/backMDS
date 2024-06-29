const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');

const Cloth = sequelize.define('Cloth', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clothType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clothes',
    timestamps: true,
    underscored: true
});

const Job = require('./jobModel');
    Job.hasMany(Cloth, {
        foreignKey: 'name_job',
    });
    Cloth.belongsTo(Job, {
        foreignKey: 'name_job',
    });

module.exports = Cloth;
