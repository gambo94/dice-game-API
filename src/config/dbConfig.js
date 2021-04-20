// setting up the DB
const mongoose = require('mongoose');


mongoose
    .connect('mongodb://localhost:27017/dice_game', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
})
    .then(() => console.log('MongoDB is connected'))
    .catch(error => console.error('Could not connect to MongoDB:', error.message))

const db = mongoose.createConnection();

module.exports = db;