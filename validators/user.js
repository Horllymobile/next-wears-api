const Joi = require('joi');

module.exports = function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(100),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().min(14).max(20),
        isAdmin: Joi.boolean().default(false)
    });

    return schema.validate(user);
} 