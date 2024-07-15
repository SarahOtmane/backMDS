const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    acceptNewOrder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: [[false, true]]
        }
    },
    siret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tva: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    tableName: 'artisans',
    timestamps: true,
    underscored: true
});

const Job = require('./jobModel');
    Job.hasMany(Artisan, {
        foreignKey: 'name_job',
    });
    Artisan.belongsTo(Job, {
        foreignKey: 'name_job',
    });

module.exports = Artisan;