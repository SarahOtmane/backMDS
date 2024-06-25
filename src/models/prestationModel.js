const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

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
        foreignKey: 'id_job',
    });
    Prestation.belongsTo(Job, {
        foreignKey: 'id_job',
    });



module.exports = Prestation;
