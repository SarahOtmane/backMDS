const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .get(jobController.getAllJobs)



router
    .route('/:id')
    .get(jobController.getAJob)


/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/  

router
    .route('/')
    .post(jwtMiddleware.isAdmin, jobController.createAJob)



router
    .route('/:id')
    .all(jwtMiddleware.isAdmin)
    .put(jobController.putAJob)
    .delete(jobController.deleteAJob);

module.exports = router;