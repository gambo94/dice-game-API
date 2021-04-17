const Player = require('../models/player');
const Game = require('../models/game');
const uniqid  = require('uniqid');
const db = require('../config/dbConfig')


// rolls dices and returns an array with two numbers
const rollDices = () => {
    let numOne = Math.floor(Math.random() * 6) +1;
    let numTwo = Math.floor(Math.random() * 6) +1;
    let dicePair = [numOne, numTwo];
    return dicePair;
}

// inserts an anonymous user 
const insertAnonymous = async () => {
    let id = uniqid();
    let anonymousName = `ANONYMOUS-${id}`;
    const newPlayer = new Player({
        username: anonymousName
    });
    return await newPlayer.save();
}

// inserts a new unique user 
const insertUser = async (username) => {
    const newPlayer = new Player({
        username: username
    });
    return await newPlayer.save()
}

// insert a game table into the db
const insertRoll = async (player_id) => {
    // rolling dices and storing the results in array
        let dicesArray = rollDices();
    // storing in result whether player won
        let result = dicesArray[0] + dicesArray[1] === 7 ? 'WIN' : 'LOSE';
    // creating game object to be stored in player.game array
        let newGame = new Game(dicesArray[0], dicesArray[1], result);
    // updating user's game array by id
        await Player.findOneAndUpdate(
            { _id: player_id },
            { $push: { games: newGame } },
            // this will return the new updated object
            { new : true}
        );
    // returning the game object to send with the JSON
        return newGame;
}

// updates the player if he/she exists
const updatePlayer = async (old_username, new_username) => {
    try {
        return await Player.findOneAndUpdate(
            { username: old_username },
            { $set:{ username:new_username } }, 
            { new: true }
        )
    } catch (error) {
        return error;
    }
}

// deletes all game of a selected user
const removeGames = async (player_id) => {
    try {
        let playerUpdated = Player.findOneAndUpdate(
            { _id: player_id },
            { games: [] },
            { new: true }
        )
        return playerUpdated;
    } catch (error) {
        return error;
    }




    // return new Promise((resolve, reject) => {
    //     db.query(query.remove, player_id, (err, row, fields) =>{
    //         if(!err){
    //             resolve('All games of selected user removed');
    //         } else {
    //             reject('User with id selected not found');
    //         }
    //     })
    // })
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
    insertRoll, updatePlayer, removeGames, getWinRate, getGames,
    getAverage, getWinner, getLoser };