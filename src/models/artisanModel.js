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
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
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