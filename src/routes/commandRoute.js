const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()


router
    .route('/users')
    .all(jwtMiddleware.verifyTokenUser)
    .get(commandController.getCommandOfUser)


router
    .route('/:id_artisan')
    .all(jwtMiddleware.verifyTokenUser)
    .post(commandController.createACommand)
    
/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/  
router
    .route('/')
    .get(commandController.getAllCommand)





module.exports = router;