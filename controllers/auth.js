const validateAuth = require('../validators/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller that sign user in
const login = async (req, res) => {
    const { error } = validateAuth(req.body); // checking and validating data with Joi

    if(error) return res.status(401).send(error.details[0].message); // if error it will return error messages

    try { 
        const user = await User.findOne({email: req.body.email}); // find if provided user is available in the database

        if(user) { // checking if the user is available
            const isMatch = bcrypt.compareSync(req.body.password, user.password); // checking if the password match the hashed password
            if(isMatch) {
                const token = user.generateToken(); // generatin signin token
                return res.status(200).send(token); // sending the token along with the status
            };
            return res.status(401).send('Wrong password provided'); // if the password is not match
        }
        return res.status(402).send('Invalid email provided'); // if the email is not found in the database
    } catch (error) {
        // @TODO to log this error 
    }
    return res.send(req.body);
}

// Logout routed
const logout = async (req, res) => {
    delete req.user; // deleting the user from the request
    delete req.header('X-Auth-Token');
    return res.send(true); 
}

module.exports = {
    login,
    logout
}