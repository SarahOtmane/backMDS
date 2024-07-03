const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .get(jobController.getAllJobs)



/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/  

router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .post( jobController.createAJob)


router
    .route('/:name_job')
    .all(jwtMiddleware.isAdmin)
    .delete(jobController.deleteAJob);

module.exports = router;