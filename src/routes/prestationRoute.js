const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const prestationController = require('../controllers/prestationController.js');


router
    .all(jwtMiddleware.isAdmin)
    .post(prestationController.createAPrestation)


module.exports = router;