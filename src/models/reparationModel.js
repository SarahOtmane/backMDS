const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Reparation = sequelize.define('Reparation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clothType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reparationType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'reparations',
    timestamps: true,
    underscored: true
});

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Reparation.sync({ force: false });
        console.log("Modèle Reparation synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Reparation:", error);
    }
})();


module.exports = User;