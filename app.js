const express = require('express');
const productRoute = require('./routes/products');
require('dotenv').config();
require('./database/mongo')();

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello');
});

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', productRoute);

module.exports = app;