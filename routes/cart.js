const express = require('express');
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/auth');



const router = express.Router();


router.get('/carts', [authentication], CartController.getCarts);

router.get('/carts/:id', [authentication], CartController.get);
// Post
router.post('/carts/:id', [authentication], CartController.add);

router.delete('/carts/:id', [authentication], CartController.remove);



module.exports = router;