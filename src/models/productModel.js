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
    id_artisan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_prestation: {
        type: DataTypes.INTEGER,  
        allowNull: false,
    },
    id_cloth: {
        type: DataTypes.INTEGER,  
        allowNull: false,
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
const Cloth = require('./clothModel');

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

Cloth.hasMany(Product, {
    foreignKey: "id_cloth",
});
Product.belongsTo(Cloth, {
    foreignKey: "id_cloth",
});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        await Product.sync({ force: false });
        console.log("Modèle Product synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Product:", error);
    }
})();

module.exports = Product;
