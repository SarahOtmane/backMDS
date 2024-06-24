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



module.exports = Newsletter;