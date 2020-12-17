const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const authToken = req.header('X-Auth-Token');

    if(!authToken) return res.status(400).send('Access denied, No token provided');

    try {
        const token = authToken.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decode;
        next();
        return;
    } catch (error) {
        return res.status(400).send('Invalid token');
    }
}