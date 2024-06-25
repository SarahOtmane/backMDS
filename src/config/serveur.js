const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger/config.js');

const User = require('../models/userModel.js');
const Info = require('../models/infoModel.js');
const Job = require('../models/jobModel.js');
const Newsletter = require('../models/newsletterModel.js');
const Artisan = require('../models/artisanModel.js');
const Cloth = require('../models/clothModel.js');
const Prestation = require('../models/prestationModel.js');
const Product = require('../models/productModel.js');
const Command = require('../models/commandModel.js');
const Testimonial = require('../models/testimonialModel.js');

const userRoute = require('../routes/userRoute.js'); 
const infoRoute = require('../routes/infoRoute.js'); 
const jobRoute = require('../routes/jobRoute.js'); 
const newsletterRoute = require('../routes/newsletterRoute.js');
const artisanRoute = require('../routes/artisanRoute.js'); 
const prestationRoute = require('../routes/prestationRoute.js');
const productRoute = require('../routes/productRoute.js');
const clothRoute = require('../routes/clothRoute.js');
const testimonialRoute = require('../routes/testimonialRoute.js'); 
const commandRoute = require('../routes/commandRoute.js');

function createServeur() {
    const app = express();

    // Synchronisation des modèles avec la base de données
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

    app.use(cors({
        origin: ['http://localhost:3000', 'http://renowear.fr'],
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Configuration de Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/users', userRoute);
    app.use('/infos', infoRoute);
    app.use('/jobs', jobRoute);
    app.use('/newsletter', newsletterRoute);
    app.use('/artisans', artisanRoute);
    app.use('/prestations', prestationRoute);
    app.use('/products', productRoute);
    app.use('/clothes', clothRoute);
    app.use('/testimonials', testimonialRoute);
    app.use('/commands', commandRoute);

    return app;
}

module.exports = createServeur;
