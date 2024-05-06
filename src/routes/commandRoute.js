const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');