const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acceptNewOrder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: [[false, true]]
        }
    },
    streetAdress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    siret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroTVA: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'artisans',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Job = require('./jobModel');
Job.hasMany(Artisan, {
    foreignKey: 'id_job',
});
Artisan.belongsTo(Job, {
    foreignKey: 'id_job',
});

module.exports = Artisan;
