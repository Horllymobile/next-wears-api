// Impotying json web token
const jwt = require('jsonwebtoken');

// declaring and exporting authentication middleware
module.exports = function(req, res, next) {

    // Getting the token from the request headers
    const authToken = req.header('X-Auth-Token');

    // If token not found it will return access denied
    // Checking if the token is provided
    if(!authToken) return res.status(403).send('Access denied, No token provided');

    // try block for verifying if provided token is valid json web token
    try {
        // Getting the token by spliting the authToken with space and getting the second element of the array which
        // The token 
        const token = authToken.split(' ')[1];

        // Varifying the token
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        // Declaring a user variable in the request with decoded token
        req.user = decode;
        
        next();
        return;
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}