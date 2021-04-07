const db = require('../config/dbConfig');
const query = require('../repository/queries');


// rolls dices and returns an array with two numbers
const rollDices = () => {
    let numOne = Math.floor(Math.random() * 6) +1;
    let numTwo = Math.floor(Math.random() * 6) +1;
    let dicePair = [numOne, numTwo];
    return dicePair;
}

// inserts an anonymous user 
const insertAnonymous = () => {
    return new Promise((resolve, reject) =>{
        db.query(query.insertAnonymous, (err, row, fields) =>{
            if(!err){
                resolve(true);
            } else {
                reject('User already exists, please select another one', err);
            }
        })
    })
}

// inserts an anonymous user 
const insertUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query(query.insert, username, (err, row, fields) =>{
            if(!err){
                resolve(true);
            } else {
                reject('User already exists, please select another one');
            }
        })
    })
}

// insert a game table into the db
const insertRoll = (player_id) => {
    return new Promise((resolve, reject) => {
    // rolling dices and storing the results in array
        let dicesArray = rollDices();
        let result = '';
            // checking if player won
        if (dicesArray[0] + dicesArray[1] === 7){
            result = 'WIN';
        } else {
            result = 'LOSE';
        }
        db.query(query.game, [result, dicesArray[0], dicesArray[1], player_id], (err, row, fields) =>{
            if(!err){
                resolve(result)
            } else {
                reject(`There was a problem rolling your dices, try with a correct user :/`);
            }
        })
    })
}

// checks if player exists
const playerExist = (old_username, new_username) => {
    return new Promise((resolve, reject) => {
        db.query(query.exist, old_username, (err, row, fields) => {
            if(!err){
                let queryName = fields[0].name;
                let result = row[0][queryName];
                if(result ===1){
                    let userArr = [old_username, new_username];
                    resolve(userArr);
                } else {
                    console.log('User not found, please select an existing one');
                }
            } else {
                reject(err);
            }
        })
    })
}

// updates the player if he/she exists
const updatePlayer = (userArr) => {
    return new Promise((resolve, reject) => {
        db.query(query.update, [userArr[1], userArr[0]], (err, row, fields) => {
            if(!err){
                resolve('Username updated successfully');
            }else{
                reject(err);
            }
        })
    })
}




module.exports = { rollDices, insertAnonymous, insertUser, insertRoll, updatePlayer, playerExist };