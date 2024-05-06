const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/:id_artisan')
    .all(jwtMiddleware.verifyTokenUser)
    .post(commandController.createACommand)

router
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(commandController.getCommandOfArtisan)


/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/  
router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .get(commandController.getAllCommand)


router
    .route('/:id_command')
    .all(jwtMiddleware.isAdmin)
    .put(commandController.putACommand)




module.exports = router;