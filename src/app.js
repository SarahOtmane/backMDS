const express = require('express');
const sequelize = require("sequelize");
const cors = require('cors');
const app = express();
const port = 3004;


// Configuration de la base de données
const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});

// Test de la connexion à la base de données
db.authenticate()
    .then(() => {
        console.log("Connecté à la base de données MySQL!");
    })
    .catch(err => {
        console.error("Impossible de se connecter à la base de données:", err);
});

const User = require('./models/userModel');
const Info = require('./models/infoModel');
const Job = require('./models/jobModel');
const Newsletter = require('./models/newsletterModel');
const Artisan = require('./models/artisanModel');
const Cloth = require('./models/clothModel');
const Prestation = require('./models/prestationModel');
const Product = require('./models/productModel');
const Command = require('./models/commandModel');
const Testimonial = require('./models/testimonialModel');

// Synchronisation des modèles avec la base de données
async function createTablesInOrder(){
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

app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://renowear.fr',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// Configuration de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger/config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Configuration des routes
const userRoute = require('./routes/userRoute'); 
app.use('/users', userRoute);

const infoRoute = require('./routes/infoRoute.js'); 
app.use('/infos', infoRoute);

const jobRoute = require('./routes/jobRoute.js'); 
app.use('/jobs', jobRoute);

const newsletterRoute = require('./routes/newsletterRoute.js');
app.use('/newsletter', newsletterRoute);

const artisanRoute = require('./routes/artisanRoute'); 
app.use('/artisans', artisanRoute);

const prestationRoute = require('./routes/prestationRoute.js');
app.use('/prestations', prestationRoute);

const productRoute = require('./routes/productRoute.js');
app.use('/products', productRoute);

const clothRoute = require('./routes/clothRoute.js');
app.use('/clothes', clothRoute);

const testimonialRoute = require('./routes/testimonialRoute.js'); 
app.use('/testimonials', testimonialRoute);

const commandRoute = require('./routes/commandRoute.js');
app.use('/commands', commandRoute);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});


