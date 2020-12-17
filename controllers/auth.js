const validateAuth = require('../validators/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { error } = validateAuth(req.body);
    if(error) return res.status(401).send(error.details[0].message);

    try {
        const user = await User.findOne({email: req.body.email});

        if(user) {
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(isMatch) {
                const token = user.generateToken();
                return res.status(200).send(token);
            };
            return res.status(401).send('Wrong password provided');
        }
        return res.status(402).send('Invalid email provided');
    } catch (error) {
        
    }
    return res.send(req.body);
}

const logout = async (req, res) => {

}

module.exports = {
    login,
    logout
}