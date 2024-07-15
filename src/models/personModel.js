const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;


const Person = sequelize.define('Person', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['user', 'admin', 'artisan']]
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subscribeNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[false, true]]
        }
    },
}, {
    tableName: 'persons',
    timestamps: true,
    underscored: true
});

const Address = require('./adressModel');
const Artisan = require('./artisanModel');

    Address.hasMany(Person, {
        foreignKey: 'id_address',
    });
    Person.belongsTo(Address, {
        foreignKey: 'id_address',
    });

    Artisan.hasMany(Person, {
        foreignKey: 'id_artisan',
    });
    Person.belongsTo(Artisan, {
        foreignKey: 'id_artisan',
    });


module.exports = Person;