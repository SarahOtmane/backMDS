const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_detail: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
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
        await User.sync({ force: false });
        console.log("Modèle User synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle User:", error);
    }
})();


module.exports = User;