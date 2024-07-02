const { Sequelize, DataTypes } = require('sequelize');

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


const Person = require('./personModel');
const Artisan = require('./artisanModel');

Person.hasMany(Testimonial, {
    foreignKey: 'email_user',
});
Testimonial.belongsTo(Person, {
    foreignKey: 'email_user',
});

Artisan.hasMany(Testimonial, {
    foreignKey: 'email_artisan',
});
Testimonial.belongsTo(Artisan, {
    foreignKey: 'email_artisan',
});




module.exports = Testimonial;