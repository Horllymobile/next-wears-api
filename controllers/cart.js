const Product = require('../models/products');
const User = require('../models/user');

// controller that gett all the carts
const getCarts = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart');

        if(user) {
            return res.status(200).send(user.cart);
        }
        return res.status(400).send('User with the id is not found');
    } catch (error) {
        // @TODO to log
    }
}

// Controller for getting a single product from the cart array
const get = async(req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            const find = user.cart.find(item => item.product.toString() === req.params.id);
            if(find){
                return res.send(find);
            }
            return res.send('No product in the cart');
        }
        return res.status(400).send('User with the id is not found');
    } catch (error) {
        // @TODO to log
    }
}

// controller that add product to cart 
const add = async(req, res) => {
    try {
        // getting the user with the req.user 
        let user = await User.findById(req.user._id);
        if(user) {
            // finding product with params in the url route 
            const product = await Product.findById(req.params.id);
            // user cart
            const cart = user.cart;
            // checking if product is already in the cart
            const find = cart.find(item => item.product.toString() === product._id.toString());

            if(!find){
                // Adding the product to cart if it is not found in the cart array
                user = await User.findByIdAndUpdate(req.user._id);
                user.cart.push({
                    product: product._id,
                    title: product.title,
                    price: product.price
                });
                await user.save();
                return res.send(user.cart);
            }
            return res.send('Product already in the cart');
        }
        return res.status(400).send('User with the id is not found');
    } catch (error) {
        // @TODO to log
    }
}

// The controller for removing product from cart
const remove = async(req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            const find = user.cart.find(item => item.product.toString() === req.params.id); // finding the product
            // using the product id and array find method on the cart array
            if(find){
                //find and updating the user cart and removing product
                user = await User.findByIdAndUpdate(req.user._id);
                user.cart.splice(find._id, 1);
                await user.save();
                return res.send(user.cart);
            }
            return res.send('No product in the cart');
        }
        return res.status(400).send('User with the id is not found');
    } catch (error) {
        // @TODO to log
    }
}

module.exports = {
    getCarts,
    get,
    add,
    remove
}