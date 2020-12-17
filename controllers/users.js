const hash = require('../functions/hash');
const User = require('./../models/user');
const validateUser = require('./../validators/user');

// controller that get all users
const getUsers = async (req, res) => {
    try {
        const user = await User.find(req.query); // it will return all users if not query is specified
        if (user) {
            return res.send(user);
        }
    } catch (error) {
        return res.send(error.message);
    }
};

// controller that get a single user with the user id provided in the routes
const getUser = async (req, res) => {
    try {
        const id = req.params.id; // getting the user id from the routes parameters
        const user = await User.findById(id); // getting the user by the provided it 
        if (user) {
            return res.send(user); // returning the user if the id is valid
        }
    } catch (error) {
        return res.send(error.message); // returning error if errror is encounterd
    }
};

const createUser = async (req, res) => {
    const { error } = validateUser(req.body); // validating with prepared joi validator function

    if (error) return res.status(400).send(error.details[0].message); // if errror it will return the error message

    try {
        let user = await User.findOne({ email: req.body.email }); // checking if email already in the database
        if (!user) { //if the user is not found then it will hash password and save to mongodb database; and return the 
            // user and generate and add token to the header
            user = new User(req.body);
            user.password = hash(req.body.password);
            await user.save()
            const token = user.generateToken();
            res.setHeader('X-Auth-Token', token);
            return res.status(200).send(user);
        }
        return res.status(401).send('Email already registered with an account'); // retrning if user exist
    } catch (error) {
        // @TODO log this error in the log with wiston
        // return res.status(401).send('Email already registered with an account'); //
    }
};

// The function that delete user
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

// controller that edit user propertied
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

// exporting all  controller s
module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    editUser
}