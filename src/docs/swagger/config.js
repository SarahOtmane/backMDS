const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "renowear",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },  
        servers: [
            {
                url: "http://localhost:3003",
            },
        ],
    },
    
    apis: ["./docs/swagger/*.js"],
  };


module.exports = swaggerJsdoc(options);