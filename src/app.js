const express = require('express');
const playerRoutes = require('./routes/routes.player.js')

// express app
const app = express();


const db = require('./config/dbConfig');
db.connect((err) => {
    if(err) throw err;
    console.log('Connected');
}) 

// routes
app.use(playerRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));