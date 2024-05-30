const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

const Prestation = sequelize.define('Prestation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reparationType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    priceSuggested: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'prestations',
    timestamps: true,
    underscored: true
});

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        await Prestation.sync({ force: false });
        console.log("Modèle Prestation synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Prestation:", error);
    }
})();

module.exports = Prestation;
