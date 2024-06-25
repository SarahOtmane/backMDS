const Sequelize = require('sequelize');

async function connect() {   
    // Configuration de la base de données
    const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: "db",
        dialect: "mysql"
    });

    try {
        await db.authenticate();
        console.log("Connecté à la base de données MySQL!");
    } catch (error) {
        console.error("Impossible de se connecter à la base de données:", error);
    }
}

module.exports = connect;
