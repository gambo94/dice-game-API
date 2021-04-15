const express = require('express');
const app = express();
const playerRoutes = require('./routes/routes')

// Settings
app.set('port', process.env.PORT || 3000)


// Middlewares
app.use(express.json());


// Routes
app.use(playerRoutes);


// listening to the server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
});