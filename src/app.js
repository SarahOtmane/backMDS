const express = require('express');
const sequelize = require("sequelize");
const cors = require('cors');
const app = express();
const port = 3003;


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

app.use(cors({
    origin: 'http://localhost:3000',
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

const artisanRoute = require('./routes/artisanRoute'); 
app.use('/artisans', artisanRoute);

const infoRoute = require('./routes/infoRoute.js'); 
app.use('/infos', infoRoute);

const jobRoute = require('./routes/jobRoute.js'); 
app.use('/jobs', jobRoute);

const testimonialRoute = require('./routes/testimonialRoute.js'); 
app.use('/testimonials', testimonialRoute);

const prestationRoute = require('./routes/prestationRoute.js');
app.use('/prestations', prestationRoute);

const commandRoute = require('./routes/commandRoute.js');
app.use('/commands', commandRoute);

const productRoute = require('./routes/productRoute.js');
app.use('/products', productRoute);

const newsletterRoute = require('./routes/newsletterRoute.js');
app.use('/newsletter', newsletterRoute);

const clothRoute = require('./routes/clothRoute.js');
app.use('/clothes', clothRoute);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});


