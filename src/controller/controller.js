const service = require('../services/service');

// creates a player
const player_create_post = async (req, res) => {
    // if user field is empty, inserts anonymous player
    if(req.body.username === ""){
        try {
            let playerCreated = await service.insertAnonymous();
            res.json({
                success: true,
                message:'User created successfully',
                player: playerCreated
            });
        } catch (error) {
            res.status(409)
            .send({
            success: false,
            error: error
        });
        }
    } else {
    // inserts a player with unique username
        let username = req.body.username;
        try {
            let playerCreated = await service.insertUser(username)
            res.json({
                success: true,
                message:'User created successfully',
                player: playerCreated
            });
        } catch (error) {
            console.log(error);
            res.status(409)
            .send({
            success: false,
            message: 'Username already exists',
            MongoError: error
        });
        }
    }
}

// player_plays_post plays a game
const player_plays_post = async (req, res) => {
    try {
        let player_id = req.params.id;
        let newGame = await service.insertRoll(player_id)
        res.json({
            success: true,
            message:`Dices Rolled! You ${newGame.result}`,
            game: newGame
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            message: 'User not found, please try with a valid ID'
        });
    }
}


// player_update_put updates username
const player_update_put = async (req, res) => {
    // receives a body wiht old_username and new_username
    try {
        let old_username = req.body.old_username;
        let new_username = req.body.new_username
        let playerUpdated = await service.updatePlayer(old_username, new_username);
        // using this condition because there's no way for mongo to throw an error if user doesn't exist
        if (playerUpdated === null){
            res.status(400)
            .send({
                success: false,
                message: 'Please select an existing user',
            })
        } else {
            res.json({
                success: true,
                message: 'Updated successfully',
                playerUpdated
            })
        }
    } catch (error) {
        res.status(400)
            .send({
                success: false,
                error: error
            })
    }
}

// player_deleteGame_delete
const player_deleteGame_delete = async (req, res) => {
    try {
        let player_id = req.params.id;
        let playerUpdated = await service.removeGames(player_id);
        // using this condition because there's no way for mongo to throw an error if user doesn't exist
        if (playerUpdated === null){
            res.status(400)
            .send({
                success: false,
                message: 'Please select an existing user',
            })
        } else {
            res.json({
                success: true,
                message: 'Updated successfully',
                games: playerUpdated.games
            })
        }
    } catch (error) {
        res.status(400)
            .send({
                success: false,
                error: error
            })
    }
}

// player_winRate_get gets win rate percentage of each user
const player_winRate_get = async (req, res) => {
    try {
        let usersWinRate = await service.getWinRate()
        // sending the rows received from sql
        res.json({
            success: true,
            'users_winning_rates': usersWinRate
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            error: error
        });
    }
}


// player_details gets single user games
const player_games_get = async (req, res) => {
    try {
        let player_id = req.params.id;
        let playerGames = await service.getGames(player_id)
        res.json({
            success: true,
            games: playerGames
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            error: error
        });
    }
}

// player_average_ranking returns the average success rate among all players
const player_average_ranking = async (req, res) => {
    try {
        let result = await service.getAverage();
        res.json({
            success: true,
            message:`Average winning rate: ${result}%`
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            error: error
        });
    }
}


// player_winner returns the username with higher score
const player_winner = async (req, res) => {
    try {
        let winner = await service.getWinner();
        res.json({
            success: true,
            winner: winner
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            error: error
        });
    }
}

// player_loser return the username with higher score
const player_loser = async (req, res) => {
    try {
        let loser = await service.getLoser();
        res.json({
            success: true,
            loser: loser
        });
    } catch (error) {
        res.status(400)
            .send({
            success: false,
            error: error
        });
    }
}

module.exports = {
    player_create_post, player_plays_post, player_update_put, 
    player_deleteGame_delete, player_winRate_get, player_games_get,
    player_average_ranking, player_winner, player_loser
}