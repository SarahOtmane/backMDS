const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(jobController.createAJob)
    .get(jobController.getAJob)
    .put(jobController.putAJob)
    .delete(jobController.deleteAJob);



module.exports = router;