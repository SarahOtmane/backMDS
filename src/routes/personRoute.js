const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()

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
    .put(personController.updateDetailsPerson)

router 
    .route('/user/password')
    .all(jwtMiddleware.verifyTokenUser)
    .put(personController.updatePassword)

router 
    .route('/artisan')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(personController.getAnArtisan)
    .put(personController.updateDetailsPerson)

router 
    .route('/artisan/password')
    .all(jwtMiddleware.verifyTokenArtisan)
    .put(personController.updatePassword)



module.exports = router;