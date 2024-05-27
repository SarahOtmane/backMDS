const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const prestation_artisanController = require('../controllers/prestation_artisanController');



router
    .route('/')
    .all(jwtMiddleware.verifyTokenArtisan)
    .post(prestation_artisanController.createAPrestaArtisan)



export default router;

