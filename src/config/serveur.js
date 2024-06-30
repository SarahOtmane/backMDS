const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger/config.js');

const adressRoute = require('../routes/adressRoute.js');
const personRoute = require('../routes/personRoute.js'); 
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
    
    app.use(cors({
        origin: ['http://localhost:3000', 'http://renowear.fr'],
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Configuration de Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // app.use('/adresses', adressRoute);
    app.use('/persons', personRoute);
    app.use('/infos', infoRoute);
    app.use('/jobs', jobRoute);
    app.use('/newsletter', newsletterRoute);
    // app.use('/artisans', artisanRoute);
    app.use('/prestations', prestationRoute);
    // app.use('/products', productRoute);
    app.use('/clothes', clothRoute);
    // app.use('/testimonials', testimonialRoute);
    // app.use('/commands', commandRoute);

    return app;
}

module.exports = createServeur;
