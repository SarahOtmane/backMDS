const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Person = sequelize.define('Person', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['user', 'admin', 'artisan']]
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subscribeNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: [[false, true]]
        }
    },
}, {
    tableName: 'persons',
    timestamps: true,
    underscored: true
});

const Adress = require('./adressModel');
const Artisan = require('./artisanModel');

    Adress.hasMany(Person, {
        foreignKey: 'id_adress',
    });
    Person.belongsTo(Adress, {
        foreignKey: 'id_adress',
    });

    Artisan.hasMany(Person, {
        foreignKey: 'id_artisan',
    });
    Person.belongsTo(Artisan, {
        foreignKey: 'id_artisan',
    });


module.exports = Person;