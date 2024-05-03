const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(infoController.createAnInfo)
    .get(infoController.getAnInfo)
    .put(infoController.putAnInfo)
    .delete(infoController.deleteAnInfo);



module.exports = router;