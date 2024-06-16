const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Newsletter = sequelize.define('Newsletter', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
}, {
    tableName: 'newsletters',
    timestamps: true,
    underscored: true
});

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Newsletter.sync({ force: false });
        console.log("Modèle Newsletter synchronisée avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Newsletter:", error);
    }
})();


module.exports = Newsletter;