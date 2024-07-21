const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

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
const Artisan = require('./artisanModel');

    Prestation.hasMany(Product, {
        foreignKey: "id_prestation",
    });
    Product.belongsTo(Prestation, {
        foreignKey: "id_prestation",
    });
    
    Artisan.hasMany(Product, {
        foreignKey: "id_artisan",
    });
    Product.belongsTo(Artisan, {
        foreignKey: "id_artisan",
    });


module.exports = Product;
