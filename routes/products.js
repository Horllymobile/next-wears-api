const express = require('express');
const ProductController = require('./../controllers/products');
const authentication = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const route  = express.Router();

// GET ROUTES
route.get('/products', ProductController.getProducts);
route.get('/products/:id', ProductController.getProduct);

// Post Routes based on authentication and admin authorization
route.post('/products', [authentication, admin],ProductController.createProducts);

// Delete Product routes only by admin
route.delete('/products/:id', [authentication, admin], ProductController.deleteProduct);

module.exports = route;