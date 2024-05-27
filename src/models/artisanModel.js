const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acceptNewOrder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: [[false, true]]
        }
    },
    streetAdress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'artisans',
    timestamps: true,
    underscored: true
});


// Définition des relations
const Job = require('./jobModel');
Job.hasMany(Artisan, {
    foreignKey: 'id_job',
});
Artisan.belongsTo(Job);

// Hash avant de sauvegarder en base de données
Artisan.addHook('beforeSave', async (artisan) => {
    try {
        const algo = await bcrypt.genSalt(10);
        const hashPw = await bcrypt.hash(artisan.password, algo);
        artisan.password = hashPw;
    } catch (error) {
        throw new Error(error);
    }
  });

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Artisan.sync({ force: false });
        console.log("Modèle Artisan synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Artisan:", error);
    }
})();


module.exports = Artisan;