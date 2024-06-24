const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Commande = sequelize.define('Commande', {
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

User.hasMany(Commande, {
    foreignKey: 'id_user',
});
Commande.belongsTo(User, {
    foreignKey: 'id_user',
});

Product.hasMany(Commande, {
    foreignKey: 'id_product',
});
Commande.belongsTo(Product, {
    foreignKey: 'id_product',
});

Cloth.hasMany(Commande, {
    foreignKey: "id_cloth",
});
Commande.belongsTo(Cloth, {
    foreignKey: "id_cloth",
});


module.exports = Commande;