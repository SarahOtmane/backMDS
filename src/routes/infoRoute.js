const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .get(infoController.getAllInfo)
    
    

router
    .route('/:id_info')
    .get(infoController.getAnInfo)




/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/
router
    .route('/')
    .post(jwtMiddleware.isAdmin, infoController.createAnInfo)

router
    .route('/:id_info')
    .all(jwtMiddleware.isAdmin)
    .put(infoController.putAnInfo)
    .delete(infoController.deleteAnInfo);


module.exports = router;