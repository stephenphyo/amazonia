const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxxxx
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                    res.status(401).send({ message: 'Invalid Authorization Token' });
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No Authorization Token' });
    }
}

module.exports = isAuth;