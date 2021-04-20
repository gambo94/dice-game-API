const express = require('express');
const app = express();
const playerRoutes = require('./routes/routes');
const verifyToken = require('./middlewares/tokenAuth');
const login = require('./controller/authController');

// Settings
app.set('port', process.env.PORT || 3000)


// Middlewares
app.use(express.urlencoded(true));
app.use(express.json());

// Creating a fake login to generate the JWT
app.post('/login', login);

// API routes
app.use(verifyToken, playerRoutes);


// listening to the server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
});