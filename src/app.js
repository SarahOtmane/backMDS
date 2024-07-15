require('dotenv').config();
const Server = require('./services/serveur');
const Database = require('./services/connectBdd');
const TablesManager = require('./services/tablesBdd');

class App {
    constructor(port) {
        this.port = port;
        this.server = new Server();
    }

    async start() {
        try {
            await Database.connect();
            await TablesManager.createTablesInOrder();
            this.server.start(this.port);
        } catch (error) {
            console.error('Erreur lors de la connexion à la base de données :', error);
        }
    }
}

const app = new App(3004);
app.start();
