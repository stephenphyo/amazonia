const jwt = require('jsonwebtoken');

const generateJWT = (userInfo) => {
    return jwt.sign(userInfo, process.env.JWT_SECRET, {expiresIn:'30d'});
}

module.exports = generateJWT;