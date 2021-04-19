const Player = require('../models/player');
const Game = require('../models/game');
const uniqid  = require('uniqid');
const db = require('../config/dbConfig');
const { TokenExpiredError } = require('jsonwebtoken');


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
    // creating game document
        const newGame = new Game({
            dice_one: dicesArray[0], 
            dice_two: dicesArray[1], 
            result, 
            player_id
        });
    // updating user's game array by id
        return await newGame.save();
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

        let response =  await Game.deleteMany(
            { player_id: player_id }
        )
    console.log(response);
    console.log(response.deletedCount)
    return response.deletedCount;

}

// getting win rate percentage for each user
const getWinRate = async () => {
    // get all players' id and username and storing them in array 
    let allPlayers = await Player.find({}, {username: 1});
    // array where to store the users with theirs rates score
    let finalArray = [];
    // return number of wins for one given user
    for (let i = 0; i < allPlayers.length; i++){
        let numberWins = await Game.find({'result':'WIN', 'player_id': allPlayers[i]._id}).countDocuments();
        let numberGames = await Game.find({'player_id': allPlayers[i]._id}).countDocuments();
        let winRate = (((numberWins/numberGames).toFixed(2))*100).toFixed();
        let newObj = {
            username: allPlayers[i].username,
            winRate: winRate
        }
        finalArray.push(newObj);
    }
    // filtering the array to remove players who don't have games
    const newFinal = finalArray.filter((obj)=> !isNaN(obj.winRate));
    return newFinal;
}

// getting single player games
const getGames = async (player_id) => {
    const gamesOfSelectedPlayer = await Game.find({player_id: player_id})
    if (gamesOfSelectedPlayer.length > 0){
            return gamesOfSelectedPlayer;
        } else {
            console.log('hola');
            throw new Error('Please select a valid user who played at least one game')
        }
}


// average of the percentage of success of all users
const getAverage = async () => {
    // get all players' id and storing them in array 
    let allPlayers = await Game.distinct('player_id')
    // array where to store the users with theirs rates score
    let winAvgScoresArray = [];
    // return number of wins for one given user
    for (let i = 0; i < allPlayers.length; i++){
        let numberWins = await Game.find({'result':'WIN', 'player_id': allPlayers[i]}).countDocuments();
        let numberGames = await Game.find({'player_id': allPlayers[i]}).countDocuments();
        let winRate = ((numberWins/numberGames).toFixed(2))*100;
        
        winAvgScoresArray.push(winRate);
    }
    if(winAvgScoresArray.length > 0){
            // getting the average
    let average = winAvgScoresArray.reduce((a, b) => a + b) / winAvgScoresArray.length;
    return average;
    } else {
        throw new Error('Nobody played the game :(')
    }


}

const getWinner = async () => {
        // get all players' id and username and storing them in array 
        let allPlayers = await Player.find({}, {username: 1});
        // array where to store the users with theirs rates score
        let finalArray = [];
        // return number of wins for one given user
        for (let i = 0; i < allPlayers.length; i++){
            let numberWins = await Game.find({'result':'WIN', 'player_id': allPlayers[i]._id}).countDocuments();
            let numberGames = await Game.find({'player_id': allPlayers[i]._id}).countDocuments();
            let winRate = (((numberWins/numberGames).toFixed(2))*100);
            let newObj = {
                username: allPlayers[i].username,
                winRate: winRate
            }
            finalArray.push(newObj);
        }
        // filtering the array to remove players who don't have games
        const newFinal = finalArray.filter((obj)=> !isNaN(obj.winRate));
        console.log(newFinal) ;
        // getting the player who score is higher
        let winningPlayer = newFinal.reduce((max, currentPlayer) => {
            return max.winRate > currentPlayer.winRate ? max : currentPlayer;
        })
        return winningPlayer;
}

const getLoser = async () => {
        // get all players' id and username and storing them in array 
        let allPlayers = await Player.find({}, {username: 1});
        // array where to store the users with theirs rates score
        let finalArray = [];
        // return number of wins for one given user
        for (let i = 0; i < allPlayers.length; i++){
            let numberWins = await Game.find({'result':'WIN', 'player_id': allPlayers[i]._id}).countDocuments();
            let numberGames = await Game.find({'player_id': allPlayers[i]._id}).countDocuments();
            let winRate = (((numberWins/numberGames).toFixed(2))*100);
            let newObj = {
                username: allPlayers[i].username,
                winRate: winRate
            }
            finalArray.push(newObj);
        }
        // filtering the array to remove players who don't have games
        const newFinal = finalArray.filter((obj)=> !isNaN(obj.winRate));
        console.log(newFinal) ;
        // getting the player who score is higher
        let losingPlayer = newFinal.reduce((min, currentPlayer) => {
            return min.winRate < currentPlayer.winRate ? min : currentPlayer;
        })
        return losingPlayer;
}


module.exports = { rollDices, insertAnonymous, insertUser, 
    insertRoll, updatePlayer, removeGames, getWinRate, getGames,
    getAverage, getWinner, getLoser };