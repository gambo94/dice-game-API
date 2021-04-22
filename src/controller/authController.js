const jwt = require('jsonwebtoken');

// login route that generates the token
const loginGeneratesToken = async (req, res) => {
    // this part would be the authentication with user and password


// creating a fake user for authentication
const userObj = { username: 'fakeone', pwd: '123abc'}

// storing the user that client inserts in the body for comparing it later
    const user = {
        username: req.body.username,
        pwd: req.body.pwd
    }

    jwt.sign(user, 'secretkey', (err, token) => {  // if you want the token to expire just add an object between user and callback, example: { expiresIn: 60 }
        if(err) return err;
        if(JSON.stringify(userObj) !== JSON.stringify(user)){
            res.json({
                success: false,
                message: 'Please insert a valid user and password'
            })
        } else{
            res.json({
                token
            });
        }
    });
}

module.exports = loginGeneratesToken;

