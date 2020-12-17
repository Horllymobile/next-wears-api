const express = require('express');
const UserController = require('./../controllers/users');

const route  = express.Router();

// GET ROUTES
route.get('/users', UserController.getUsers);
route.get('/users/:id', UserController.getUser);

// Post Routes
route.post('/users', UserController.createUser);

// Put Route
route.put('/users/:id', UserController.editUser);

// This is the delete route 
// @TODO will add authentication and autorization
route.delete('/users/:id', UserController.deleteUser);

module.exports = route;