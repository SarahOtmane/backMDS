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
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: [[false, true]]
        }
    },
    id_reparation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_artisan: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});

// Hash avant de sauvegarder en base de données
// User.addHook('beforeSave', async (user) => {
//     try {
//       // Valeur par défaut de l'algorithme de hashage : 10
//         const algo = await bcrypt.genSalt(10);
//         const hashPw = await bcrypt.hash(user.password, algo);
//         user.password = hashPw;
//     } catch (error) {
//         throw new Error(error);
//     }
// });

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