const bcrypt = require('bcrypt');

// declaring and exporting/ The function that hashes password
module.exports = function(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}