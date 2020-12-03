const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 20
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 512
    },
    cart: [cartSchema]
});

module.exports = model('Product', userSchema);