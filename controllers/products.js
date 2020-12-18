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
        return res.status(200).send(data);
    })
    .catch(error => {
        return res.status(401).send(error.message);
    })
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findByIdAndDelete(id);
        if(products) {
            return res.send(products);
        }
        return res.send('No product with the giving id');
    } catch (error) {
        return res.send(error.message);
    }
};

module.exports = {
    getProducts,
    createProducts,
    getProduct,
    deleteProduct
}