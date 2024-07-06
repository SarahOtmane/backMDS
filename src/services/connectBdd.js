const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: "db",
            dialect: "mysql"
        });
    }

    async connect() {
        try {
            await this.db.authenticate();
            console.log("Connecté à la base de données MySQL!");
        } catch (error) {
            console.error("Impossible de se connecter à la base de données:", error);
        }
    }
}

module.exports = new Database();
