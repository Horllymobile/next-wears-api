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
    image_urls:[{
        type: String,
        required: true
    }],
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
    },
    size: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        maxlength: 50
    }
});

module.exports = model('Product', productSchema);