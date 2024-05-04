const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(jobController.createAJob)



router
    .route('/:id')
    .get(jobController.getAJob)
    .all(jwtMiddleware.verifyToken)
    .put(jobController.putAJob)
    .delete(jobController.deleteAJob);



module.exports = router;