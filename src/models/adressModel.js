const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'addresses',
    timestamps: true,
    underscored: true
});


module.exports = Address;