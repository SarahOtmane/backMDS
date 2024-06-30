const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/user/register')
    .post(personController.registerAUser)

router
    .route('/artisan/register')
    .post(personController.registerAnArtisan)



module.exports = router;