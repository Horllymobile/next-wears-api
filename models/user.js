const { model, Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
    },
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        minlength: 50,
        maxlength: 512,
        required: true
    }
});

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
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512
    },
    phone: {
        type: String,
        minlength: 14,
        maxlength: 20
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [cartSchema],
    order: [orderSchema]
});


userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY,{expiresIn: '1h'});
}

module.exports = model('User', userSchema);