const jwt = require('jsonwebtoken');

// login route that generates the token
const loginGeneratesToken = async (req, res) => {
    // this part would be the authentication with user and password

    // using a fake one
    const username = req.body.username;
    // creating the object
    const user = { name: username };


    jwt.sign(user, 'secretkey', { expiresIn: 60 }, (err, token) => {
        if(err) return err;
        res.json({
            token
        });
    });
}

module.exports = loginGeneratesToken;

