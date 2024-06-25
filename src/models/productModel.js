const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

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

// Définition des relations
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


if (process.env.NODE_ENV !== 'test') {
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
}


module.exports = Product;
