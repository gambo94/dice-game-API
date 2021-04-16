// setting up the DB
const mongoose = require('mongoose');


mongoose
    .connect('mongodb://localhost:27017/dice_game', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
})
    .then(() => console.log('Db is connected'))
    .catch(error => console.error('Connection error', error.message))

const db = mongoose.createConnection();

module.exports = db;