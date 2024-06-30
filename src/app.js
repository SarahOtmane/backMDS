const createServeur = require('./config/serveur');
const connect = require('./config/connectBdd');

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
