const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Testimonial = sequelize.define('Testimonial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'testimonials',
    timestamps: true,
    underscored: true
});

const User = require('./userModel');
const Artisan = require('./artisanModel');

User.hasMany(Testimonial, {
    foreignKey: 'id_user',
});
Testimonial.belongsTo(User, {
    foreignKey: 'id_user',
});

Artisan.hasMany(Testimonial, {
    foreignKey: 'id_artisan',
});
Testimonial.belongsTo(Artisan, {
    foreignKey: 'id_artisan',
});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Testimonial.sync({ force: false });
        console.log("Modèle Testimonial synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Testimonial:", error);
    }
})();


module.exports = Testimonial;