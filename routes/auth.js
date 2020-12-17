
const express = require('express');
const AuthControllter = require('./../controllers/auth');

const route  = express.Router();


// SignIn Routes
route.post('/auth/signin', AuthControllter.login);

// Sign Out Route
route.post('/auth/signout', AuthControllter.logout);

module.exports = route;