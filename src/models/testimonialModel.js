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


const User = require('./userModel');

User.hasMany(Testimonial, {
    foreignKey: 'email_user',
});
Testimonial.belongsTo(User, {
    foreignKey: 'email_user',
});

User.hasMany(Testimonial, {
    foreignKey: 'email_artisan',
});
Testimonial.belongsTo(User, {
    foreignKey: 'email_artisan',
});




module.exports = Testimonial;