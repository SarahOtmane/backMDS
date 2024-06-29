const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');


const Command = sequelize.define('Command', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateFinished: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'commands',
    timestamps: true,
    underscored: true
});



const User = require('./userModel');
const Product = require('./productModel');
const Cloth = require('./clothModel')
    
    User.hasMany(Command, {
        foreignKey: 'email_user',
    });
    Command.belongsTo(User, {
        foreignKey: 'email_user',
    });
    
    Product.hasMany(Command, {
        foreignKey: 'id_product',
    });
    Command.belongsTo(Product, {
        foreignKey: 'id_product',
    });
    
    Cloth.hasMany(Command, {
        foreignKey: "id_cloth",
    });
    Command.belongsTo(Cloth, {
        foreignKey: "id_cloth",
    });


module.exports = Command;