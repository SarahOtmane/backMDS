const { DataTypes } = require('sequelize');
const sequelize = require('../services/connectBdd').db;

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


const Person = require('./personModel');
const Artisan = require('./artisanModel');

Person.hasMany(Testimonial, {
    foreignKey: 'email_user',
});
Testimonial.belongsTo(Person, {
    foreignKey: 'email_user',
});

Artisan.hasMany(Testimonial, {
    foreignKey: 'id_artisan',
});
Testimonial.belongsTo(Artisan, {
    foreignKey: 'id_artisan',
});




module.exports = Testimonial;