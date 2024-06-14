const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const prestationController = require('../controllers/prestationController.js');


router
    .route('/')
    .get(prestationController.getAllPresta)

router
    .route('/:id_prestation')
    .get(prestationController.getAPrestation)

router
    .route('/name/:reparationType')
    .get(prestationController.getIDPrestation)

router
    .route('/job/:id_job')
    .get(prestationController.getAllPrestaOfJob)


    
/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/
router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .post(prestationController.createAPrestation)

router
    .route('/:id_prestation')
    .all(jwtMiddleware.isAdmin)
    .put(prestationController.putAPresta)
    .delete(prestationController.deleteAPresta)



module.exports = router;