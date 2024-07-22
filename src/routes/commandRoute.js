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
    .route('/artisans')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(commandController.getCommandOfArtisan)

router
    .route('/:id_artisan')
    .all(jwtMiddleware.verifyTokenUser)
    .post(commandController.createACommand)

router 
    .route('/:id_command')
    .all(jwtMiddleware.verifyTokenArtisan)
    .put(commandController.updateDateFinishedCommand)
    
/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/  
router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .get(commandController.getAllCommand)





module.exports = router;