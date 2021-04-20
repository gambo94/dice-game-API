const jwt = require('jsonwebtoken');

// login route that generates the token
const loginGeneratesToken = async (req, res) => {
    // this part would be the authentication with user and password

    // using a fake one
    const username = req.body.username;
    // creating the object
    const user = { name: username };


    jwt.sign(user, 'secretkey', (err, token) => {  // if you want the token to expire just add an object between user and callback, example: { expiresIn: 60 }
        if(err) return err;
        res.json({
            token
        });
    });
}

module.exports = loginGeneratesToken;

