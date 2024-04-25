const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .route('/register')
    .post(userController.registerAUser)




module.exports = router;