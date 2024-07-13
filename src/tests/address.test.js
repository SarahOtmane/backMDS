const Server = require('./services/serveur');
const Address = require('../models/adressModel');
const supertest = require('supertest');

const app = new Server().app;