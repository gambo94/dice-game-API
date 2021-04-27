const repo = require('../repository/repo');





// inserts an anonymous user 
const insertAnonymous = async () => {
    await repo.insertAnon();
}

// inserts a new unique user 
const insertUser = async (username) => {
    await repo.insertUser(username);
}

// insert a game table into the db
const insertRoll = async (player_id) => {
    return await repo.insertRoll(player_id);
}

// checks if player exists with username provided
const playerExist = async (old_username, new_username) => {
    return await repo.playerExist(old_username, new_username);
}

// check if player exists with id provided
const playerExistId = async (id) => {
    return await repo.playerExistId(id);
}

// updates the player if he/she exists
const updatePlayer = async (userArr) => {
    return await repo.updatePlayer(userArr);
}

// deletes all game of a selected user
const removeGames = async (player_id) => {
    return await repo.removeGames(player_id);
}

// getting win rate percentage for each user
const getWinRate = async () => {
    return await repo.getWinRate()
}

// getting single player games
const getGames = async (player_id) => {
    return await repo.getGames(player_id);
}

// average of the percentage of success of all users
const getAverage = async () => {
    return await repo.getAverage();
}

const getWinner = async () => {
    return await repo.getWinner();
}

const getLoser = async () => {
    return await repo.getLoser();
}


module.exports = { insertAnonymous, insertUser, 
    insertRoll, updatePlayer, playerExist, playerExistId, removeGames, getWinRate, getGames,
    getAverage, getWinner, getLoser };