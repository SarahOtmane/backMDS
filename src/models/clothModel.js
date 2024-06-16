const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

const Cloth = sequelize.define('Cloth', {
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
    id_job: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'clothes',
    timestamps: true,
    underscored: true
});

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        await Cloth.sync({ force: false });
        console.log("Modèle Cloth synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Cloth:", error);
    }
})();

module.exports = Cloth;
