const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const clothController = require('../controllers/clothConntroller');




router
    .route('/')
    .get(clothController.getAllClothes)

router  
    .route('/:id_cloth')
    .get(clothController.getACloth)

router 
    .route('/job/:id_job')
    .get(clothController.getAllClothesOfJob)




/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/ 

router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .post(clothController.createACloth)

router
    .route('/:id_cloth')
    .all(jwtMiddleware.isAdmin)
    .put(clothController.putACloth)
    .delete(clothController.deleteACloth);



module.exports = router;