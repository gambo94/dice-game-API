const service = require('../services/service');

// creates a player
const player_create_post = async (req, res) => {
    // if no user found inserts anonymous player
    if(req.body.username === ""){
        try {
            await service.insertAnonymous();
            res.json('Successfully saved');
        } catch (error) {
            res.status(409).send({error})
        }
    } else {
    // inserts a player with unique username
        let username = req.body.username;
        try {
            await service.insertUser(username);
            res.json('Successfully saved');
        } catch (error) {
            res.status(409).send({error})
        }
    }
}

// player_plays_post plays a game
const player_plays_post = async (req, res) => {
    try {
        let player_id = req.params.id;
        await service.insertRoll(player_id)
        .then((result) => res.json(`Dices Rolled! You ${result}`));
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }
}


// player_update_put updates username
const player_update_put = async (req, res) => {
    // receives a body with old_username and new_username
    try {
        let old_username = req.body.old_username;
        let new_username = req.body.new_username;
        // this function checks if the username exists and returns a promise with an array containing the old and new user
        let userArr = await service.playerExist(old_username, new_username);
        // this function updates the user
        await service.updatePlayer(userArr);
        res.json('User updated successfully');
    } catch (error) {
        console.log(error);
    }
}

// player_deleteGame_delete
const player_deleteGame_delete = async (req, res) => {
    try {
        let player_id = req.params.id;
        await service.removeGames(player_id);
        res.json('All games of selected user removed');
    } catch (error) {
        console.log(error);
    }
}

// player_winRate_get gets win rate percentage of each user
const player_winRate_get = async (req, res) => {
    try {
        await service.getWinRate()
        .then((usersWinRate) => res.send({usersWinRate}));
    } catch (error) {
        res.status(204).send({error})
        console.log(error);
    }
}


// player_details gets single user


// player_delete


module.exports = {
    player_create_post, player_plays_post, player_update_put, 
    player_deleteGame_delete, player_winRate_get
}