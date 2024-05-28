const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Prestationartisan = sequelize.define('Prestationartisan', {
    id_artisan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_prestation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Prestationartisans',
    timestamps: true,
    underscored: true
});


//definition des relations
const Prestation = require('./prestationModel');
const Artisan = require('./artisanModel');

Prestation.hasMany(Prestationartisan, {
    foreignKey: "id_prestation",
});
Prestationartisan.belongsTo(Prestation, {
    foreignKey: "id_prestation",
});

Artisan.hasMany(Prestationartisan, {
    foreignKey: "id_artisan",
});
Prestationartisan.belongsTo(Artisan, {
    foreignKey: "id_artisan",
});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Prestationartisan.sync({ force: false });
        console.log("Modèle prestationartisan synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle prestation_artisan:", error);
    }
})();


module.exports = Prestationartisan;