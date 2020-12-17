const Product = require('../models/products');
const User = require('../models/user');


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

const add = async(req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            const product = await Product.findById(req.params.id);
            const cart = user.cart;
            const find = cart.find(item => item.product.toString() === product._id.toString());
            console.log(find);
            if(!find){
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

const remove = async(req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            const find = user.cart.find(item => item.product.toString() === req.params.id);
            if(find){
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