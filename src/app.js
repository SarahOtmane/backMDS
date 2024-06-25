const createServeur = require('./config/serveur');
const connect = require('./config/connectBdd');

const User = require('./models/userModel.js');
const Info = require('./models/infoModel.js');
const Job = require('./models/jobModel.js');
const Newsletter = require('./models/newsletterModel.js');
const Artisan = require('./models/artisanModel.js');
const Cloth = require('./models/clothModel.js');
const Prestation = require('./models/prestationModel.js');
const Product = require('./models/productModel.js');
const Command = require('./models/commandModel.js');
const Testimonial = require('./models/testimonialModel.js');

const port = 3004;

const app = createServeur();

// Démarrage du serveur
app.listen(port, async () => {
    try {
        await connect();
        async function createTablesInOrder() {
            try {
                await User.sync();
                console.log("Table User créée");
    
                await Info.sync();
                console.log("Table Info créée");
    
                await Job.sync();
                console.log("Table Job créée");
    
                await Newsletter.sync();
                console.log("Table Newsletter créée");
    
                await Artisan.sync();
                console.log("Table Artisan créée");
    
                await Cloth.sync();
                console.log("Table Cloth créée");
    
                await Prestation.sync();
                console.log("Table Prestation créée");
    
                await Product.sync();
                console.log("Table Product créée");
    
                await Command.sync();
                console.log("Table Command créée");
    
                await Testimonial.sync();
                console.log("Table Testimonial créée");
            } catch (error) {
                console.error("Erreur lors de la création des tables :", error);
            }
        }
        createTablesInOrder();
        console.log(`Le serveur est démarré sur le port ${port}`);
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
    }
});
