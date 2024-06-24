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


module.exports = Cloth;
