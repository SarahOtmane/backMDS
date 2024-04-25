const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .route('/register')
    .post(userController.registerAUser)

router
    .route('/login')
    .post(userController.loginAUser)

router
    .route('/')
    .get(userController.getAUser)

module.exports = router;