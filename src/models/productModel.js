const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectBdd');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
});



const Prestation = require('./prestationModel');
const Person = require('./personModel');

    Prestation.hasMany(Product, {
        foreignKey: "id_prestation",
    });
    Product.belongsTo(Prestation, {
        foreignKey: "id_prestation",
    });
    
    Person.hasMany(Product, {
        foreignKey: "email_artisan",
    });
    Product.belongsTo(Person, {
        foreignKey: "email_artisan",
    });


module.exports = Product;
