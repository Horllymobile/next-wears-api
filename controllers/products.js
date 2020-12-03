const Product = require('./../models/products');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find(req.query);
        if(products) {
            return res.send(products);
        }
    } catch (error) {
        return res.send(error.message);
    }
};

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findById(id);
        if(products) {
            return res.send(products);
        }
    } catch (error) {
        return res.send(error.message);
    }
};

const createProducts = async (req, res) => {
    const products = new Product(req.body);

    products.save()
    .then(data => {
        return res.status(400).send(data);
    })
    .catch(error => {
        return res.status(401).send(error.message);
    })
};

module.exports = {
    getProducts,
    createProducts,
    getProduct
}