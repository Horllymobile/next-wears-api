const express = require('express');
const ProductController = require('./../controllers/products');

const route  = express.Router();

// GET ROUTES
route.get('/products', ProductController.getProducts);
route.get('/products/:id', ProductController.getProduct);

// Post Routes
route.post('/products', ProductController.createProducts);

module.exports = route;