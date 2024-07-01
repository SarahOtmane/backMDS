const createServeur = require('./services/serveur');
const connect = require('./services/connectBdd');
const createTablesInOrder = require('./services/tablesBdd');

const port = 3004;

const app = createServeur();

// Démarrage du serveur
app.listen(port, async () => {
    try {
        await connect();

        createTablesInOrder();

    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
    }
});
