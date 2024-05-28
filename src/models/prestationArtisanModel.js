const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const PrestationArtisan = sequelize.define('PrestationArtisan', {
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
    tableName: 'prestationArtisans',
    timestamps: true,
    underscored: true
});


//definition des relations
const Prestation = require('./prestationModel');
const Artisan = require('./artisanModel');

Prestation.hasMany(PrestationArtisan, {
    foreignKey: "id_prestation",
});
PrestationArtisan.belongsTo(Prestation, {
    foreignKey: "id_prestation",
});

Artisan.hasMany(PrestationArtisan, {
    foreignKey: "id_artisan",
});
PrestationArtisan.belongsTo(Artisan, {
    foreignKey: "id_artisan",
});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await PrestationArtisan.sync({ force: false });
        console.log("Modèle prestation_artisan synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle prestation_artisan:", error);
    }
})();


module.exports = PrestationArtisan;