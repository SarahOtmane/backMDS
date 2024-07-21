const Sequelize = require('sequelize');

class Database {
    constructor() {
        const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME;
        const dbUser = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER;
        const dbPassword = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
        const dbHost = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST;

        console.log(`Connecting to database: ${dbName}, user: ${dbUser}, host: ${dbHost}, env: ${process.env.NODE_ENV}`);

        this.db = new Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: process.env.DB_DIALECT,
            logging: (msg) => console.log(`SQL Query: ${msg}`) 
        });
    }

    async connect() {
        try {
            await this.db.authenticate();
            console.log(`Connected to the ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database!`);
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
}

module.exports = new Database();
