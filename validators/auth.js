const Joi = require('joi');

module.exports = function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(16),
    });

    return schema.validate(user);
} 