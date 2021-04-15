const db = require('../config/dbConfig');
const query = require('../repository/queries');
const uniqid  = require('uniqid');


// rolls dices and returns an array with two numbers
const rollDices = () => {
    let numOne = Math.floor(Math.random() * 6) +1;
    let numTwo = Math.floor(Math.random() * 6) +1;
    let dicePair = [numOne, numTwo];
    return dicePair;
}

// inserts an anonymous user 
const insertAnonymous = () => {
    let id = uniqid();
    let anonymousName = `ANONYMOUS-${id}`;
    return new Promise((resolve, reject) =>{
        db.query(query.insertAnonymous, anonymousName, (err, row, fields) =>{
            if(!err){
                resolve();
            } else {
                reject('User already exists, please select another one');
            }
        })
    })
}

// inserts a new unique user 
const insertUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query(query.insert, username, (err, row, fields) =>{
            if(!err){
                resolve(username);
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
                if(result === 'WIN' || result === 'LOSE'){
                    resolve(result)
                } else {
                    reject(`There was a problem rolling your dices, try with a correct user :/`);
                }
            } else {
                reject(err)
            }
        })
    })
}

// checks if player exists with username provided
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
                    reject('User not found, please select an existing one');
                }
            } else {
                reject(err);
            }
        })
    })
}

// check if player exists with id provided
const playerExistId = (id) => {
    return new Promise((resolve, reject) => {
        db.query(query.existId, id, (err, row, fields) => {
            if(!err){
                // the query returns 1 if player exists and 0 if it doesn't
                let queryName = fields[0].name;
                let result = row[0][queryName];
                if(result === 1){
                    resolve(id);
                } else {
                    reject('User not found, please select an existing one');
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

// deletes all game of a selected user
const removeGames = (player_id) => {
    return new Promise((resolve, reject) => {
        db.query(query.remove, player_id, (err, row, fields) =>{
            if(!err){
                resolve('All games of selected user removed');
            } else {
                reject('User with id selected not found');
            }
        })
    })
}

// getting win rate percentage for each user
const getWinRate = () => {
    return new Promise ((resolve, reject) => {
        db.query(query.rates, (err, row, fields) => {
            if(!err){
                if(row.length > 0){
                    resolve(row);
                } else if(row.length === 0){
                    reject('No one played the game :(')
                }
            } else {
                reject(err);
            }
        })
    })
}

// getting single player games
const getGames = (player_id) => {
    return new Promise ((resolve, reject) => {
        db.query(query.playerGames, player_id, (err, row, fields) => {
            // if(!err && row.length > 0){
            //     resolve(row);
            // } else if(row.length === 0){
            //     reject('It seems the user did not play or doesnt exist :(')
            // } else {
            //     reject(err);
            // }
            if(!err){
                if(row.length > 0){
                    resolve(row);
                } else if(row.length === 0){
                    reject('It seems the user did not play or doesnt exist :(')
                }
            } else {
                reject(err);
            }
        })
    })
}


// average of the percentage of success of all users
const getAverage = () => {
    return new Promise ((resolve, reject) => {
        db.query(query.rates, (err, row, fields) => {
            if(!err){
            // getting all the percentage values stored in array
            let arrayOfPercentages = row.map(obj => obj.winning_percent);
            // calculating average
            let averageRate = (arrayOfPercentages.reduce((a, b) => a + b) / arrayOfPercentages.length).toFixed(2);
                if(averageRate == 0.00){
                    reject('Nobody won so far..');
                } else {
                    resolve(averageRate);
                }
            } else {
                reject(err);
            }
        })
    })
}

const getWinner = () => {
    return new Promise ((resolve, reject) => {
        // query that returns all users and their winning rates
        db.query(query.playerPercentage, (err, row, fields) => {
            if(!err){
                let winningPlayer = row.reduce((max, currentPlayer) => max.winning_percent > currentPlayer.winning_percent ? max : currentPlayer);
                if(winningPlayer.winning_percent === 0){
                    reject('There is no winner, it looks like nobody played or won');
                } else {
                    resolve(winningPlayer);
                }
            } else {
                reject(err);
            }
        })
    })
}

const getLoser = () => {
    return new Promise ((resolve, reject) => {
        db.query(query.playerPercentage, (err, row, fields) => {

            if(!err){
            // using filter to have an array only with player that have scores > 0 (I've considered that players with 0 as score didn't not play or have always lost the games)
            let playersWithScoresHigherThanZero = row.filter(player => player.winning_percent > 0);
            // using reduce to find the lowest score among the ones > 0
            let loserPlayer = playersWithScoresHigherThanZero.reduce((min, currentPlayer) => min.winning_percent < currentPlayer.winning_percent ? min : currentPlayer);
                if(loserPlayer.winning_percent === 0){
                    reject('It looks like nobody played');
                } else {
                    resolve(loserPlayer);
                }
            } else {
                reject(err);
            }
        })
    })
}


module.exports = { rollDices, insertAnonymous, insertUser, 
    insertRoll, updatePlayer, playerExist, playerExistId, removeGames, getWinRate, getGames,
    getAverage, getWinner, getLoser };