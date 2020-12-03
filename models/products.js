const { model, Schema } = require('mongoose');


const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    price: {
        type: Number,
        require: true,
        min:  1000
    },
    description: {
        type: String,
        required: true,
        minlength: 100,
        maxlength: 512
    },
    images:[{
        type: String,
        required: true
    }],
    old_price: {
        type: Number,
        require: true,
        min:  1000
    },
    color: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    sold: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Product', productSchema);