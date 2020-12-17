const hash = require('../functions/hash');
const User = require('./../models/user');
const validateUser = require('./../validators/user');


const getUsers = async (req, res) => {
    try {
        const user = await User.find(req.query);
        if (user) {
            return res.send(user);
        }
    } catch (error) {
        return res.send(error.message);
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.send(user);
        }
    } catch (error) {
        return res.send(error.message);
    }
};

const createUser = async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            user = new User(req.body);
            user.password = hash(req.body.password);
            await user.save()
            const token = user.generateToken();
            res.setHeader('X-Auth-Token', token);
            return res.status(200).send(user);
        }
        return res.status(401).send('Email already registered with an account');
    } catch (error) {
        return res.status(401).send('Email already registered with an account');
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            return res.send(user);
        }
    } catch (error) {
        return res.send(error.message);
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.send(user);
        }
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    editUser
}