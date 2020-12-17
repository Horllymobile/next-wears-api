const express = require('express');

require('dotenv').config();
require('./database/mongo')();

// Importing routers 
const productRoute = require('./routes/products');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello');
});

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', authRoute);
app.use('/api', cartRoutes);

module.exports = app;