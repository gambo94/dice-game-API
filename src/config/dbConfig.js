// setting up the DB
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '',   // example: 'localhost'
    user: '',   // example: 'root'
    password: '',  
    database: 'dice_game'  // name of the DB
})


module.exports = pool;