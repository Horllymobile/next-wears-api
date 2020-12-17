const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const user = req.user;
    
    if(user.isAdmin){
        next();
        return;
    }
    return res.sendStatus(404);
}