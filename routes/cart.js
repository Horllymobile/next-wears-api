const express = require('express');
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/auth');



const router = express.Router();

// Get -> api/carts
router.get('/carts', [authentication], CartController.getCarts);
// Get -> api/carts/product_id
router.get('/carts/:id', [authentication], CartController.get);

// Post -> api/carts/product_id
router.post('/carts/:id', [authentication], CartController.add);
// Delete -> api/carts/product_id
router.delete('/carts/:id', [authentication], CartController.remove);



module.exports = router;