const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');


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
        type: DataTypes.NUMBER,
        allowNull: true
    },
    subscribeNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: [[false, true]]
        }
    },
}, {
    tableName: 'persons',
    timestamps: true,
    underscored: true
});


module.exports = Person;