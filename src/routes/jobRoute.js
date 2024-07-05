const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()



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