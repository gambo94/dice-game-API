const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    // Get the auth header value
    const authHeader = req.headers['authorization'];

    // chacking if it's undefined and 
    // since it will be 'bearer' + space + 'token', we use split that turns the string into an array and select the token that will be in 2nd position
    const token = authHeader && authHeader.split(' ')[1];

    // check if token it's not null
    if (token == null) return res.status(401)
        .send({
            success: false,
            error: 'Please be sure to provide a token'
        });

    // verifying the token 
    jwt.verify(token, 'secretkey', (err, data) => {
            if(err) {
                if(err.name === 'TokenExpiredError'){
                        return res.status(403)
                        .send({
                        success: false,
                        error: 'Token has expired, please generate a new one'
                    });
                } else {
                        return res.status(403)
                        .send({
                        success: false,
                        error: 'Not authorized'
                    });
                }
            } else {
                req.data = data;
                next();
            }
    });
}

module.exports = verifyToken;