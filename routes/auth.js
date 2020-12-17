
const express = require('express');
const AuthControllter = require('./../controllers/auth');

const route  = express.Router();


// SignIn Routes
route.post('/auth/signin', AuthControllter.login);

// Sign Out Route
route.delete('/auth/signout', AuthControllter.logout);

module.exports = route;