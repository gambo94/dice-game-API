// setting up the DB
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',   // example: 'localhost'
    user: 'root',   // example: 'root'
    password: 'Junanago94',  
    database: 'dice_game'  // name of the DB
})


module.exports = pool;