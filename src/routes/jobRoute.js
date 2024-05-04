const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .get(jobController.getAllJobs)
    .post(jwtMiddleware.verifyToken, jobController.createAJob)



router
    .route('/:id')
    .get(jobController.getAJob)
    .put(jwtMiddleware.verifyToken, jobController.putAJob)
    .delete(jwtMiddleware.verifyToken, jobController.deleteAJob);



module.exports = router;