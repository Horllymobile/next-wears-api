// Importing jsonwebtoken 
const jwt = require('jsonwebtoken');


// exporting and declaring admin authorization function
//s Checking if the user as admin privilege
module.exports = function(req, res, next) {
    const user = req.user;
    
    // If the admin priviledge is found it should pass to th next routes middleware
    if(user.isAdmin){
        next();
        return;
    }
    // if not found it should return 404 error
    return res.status(402).send('Access denied, Not authorized');
}