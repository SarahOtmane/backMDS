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

router
    .route('/login')
    .post(personController.loginAPerson)

router
    .route('/user')
    .all(jwtMiddleware.verifyTokenUser)
    .get(personController.getAUser)

router 
    .route('/artisan')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(personController.getAnArtisan)


module.exports = router;