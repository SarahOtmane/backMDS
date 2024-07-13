const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController.js');

const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()



router
    .route('/')
    .get(infoController.getAllInfo)
    
    

router
    .route('/:name_info')
    .get(infoController.getAnInfo)




/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/
router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .post(infoController.createAnInfo)

router
    .route('/:name_info')
    .all(jwtMiddleware.isAdmin)
    .put(infoController.putAnInfo)
    .delete(infoController.deleteAnInfo);


module.exports = router;