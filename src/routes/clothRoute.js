const express = require('express');
const router = express.Router(); 
const clothController = require('../controllers/clothConntroller');
const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()



router
    .route('/')
    .get(clothController.getAllClothes)

router  
    .route('/:id_cloth')
    .get(clothController.getACloth)

router 
    .route('/job/:name_job')
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