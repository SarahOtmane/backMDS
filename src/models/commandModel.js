const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

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
    dateFinished: {
        type: DataTypes.timestamps,
        allowNull: true,
    },
    id_prestation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_artisan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'commands',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Prestation = require('./prestationModel');
Commande.belongsTo(Prestation, { foreignKey: 'id_prestation'});

const User = require('./userModel');
Commande.belongsTo(User, { foreignKey: 'id_user'});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Commande.sync({ force: false });
        console.log("Modèle Commande synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Commande:", error);
    }
})();


module.exports = Commande;