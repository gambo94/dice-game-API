// setting up the DB
const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',   // example: 'localhost'
    user: 'root',   // example: 'root'
    password: '',  
    database: 'dice_game'  // name of the DB
}

const db = mysql.createConnection(dbConfig);

module.exports = db;