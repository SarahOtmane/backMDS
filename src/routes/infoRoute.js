const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyTokenUser)
    .get(infoController.getAllInfo)
    .post(infoController.createAnInfo)
    
    

router
    .route('/:name')
    .get(infoController.getAnInfo)
    .all(jwtMiddleware.verifyTokenUser)
    .put(infoController.putAnInfo)
    .delete(infoController.deleteAnInfo);


module.exports = router;