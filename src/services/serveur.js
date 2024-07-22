const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger/config.js');
const helmet = require('helmet');

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

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.use(cors({
            origin: ['http://localhost:3000', 'http://renowear.fr'],
            methods: 'GET,PUT,POST,DELETE',
            credentials: true,
        }));

        //middleware intégré à Express qui analyse les données encodées en URL 
            //comme les données de formulaire soumises via POST) et les expose dans req.body
        this.app.use(express.urlencoded({ extended: true }));

        //middleware intégré à Express qui analyse les données JSON des requêtes entrantes 
            //et les expose dans req.body
        this.app.use(express.json());

        // Configuration de Swagger
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        this.app.use(helmet());
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"], //sources du contenu chargé 
                scriptSrc: ["'self'"], //scripts chargé 
                objectSrc: ["'none'"], //désactiver les objects intégré 
            },
        }));
    }

    routes() {
        this.app.use('/addresses', adressRoute);
        this.app.use('/persons', personRoute);
        this.app.use('/infos', infoRoute);
        this.app.use('/jobs', jobRoute);
        this.app.use('/newsletters', newsletterRoute);
        this.app.use('/artisans', artisanRoute);
        this.app.use('/prestations', prestationRoute);
        this.app.use('/products', productRoute);
        this.app.use('/clothes', clothRoute);
        // this.app.use('/testimonials', testimonialRoute);
        this.app.use('/commands', commandRoute);
    }

    start(port) {
        this.app.listen(port, async () => {
            console.log(`Serveur démarré sur le port ${port}`);
        });
    }
}

module.exports = Server;
