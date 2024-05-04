const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .get(infoController.getAllInfo)
    .post(jwtMiddleware.verifyTokenUser, infoController.createAnInfo)
    
    

router
    .route('/:id')
    .get(infoController.getAnInfo)
    .put(jwtMiddleware.verifyTokenUser, infoController.putAnInfo)
    .delete(jwtMiddleware.verifyTokenUser, infoController.deleteAnInfo);


module.exports = router;