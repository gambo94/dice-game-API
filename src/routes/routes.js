const { Router } = require('express');
const router = Router();
const playerController = require('../controller/controller')

/* ROUTES */

// get list of all players and their win rate
router.get('/players', playerController.player_winRate_get);

// creates player
router.post('/players', playerController.player_create_post);

// updates username
router.put('/players', playerController.player_update_put);

// plays a game
router.post('/players/:id/games', playerController.player_plays_post);

// deletes all the game's rows of a player
router.delete('/players/:id/games', playerController.player_deleteGame_delete);

// get all games of a player
router.get('/players/:id/games', playerController.player_games_get);

// get average of success
router.get('/players/ranking', playerController.player_average_ranking);

// get winner (player with higher score)
router.get('/players/ranking/winner', playerController.player_winner);

// get loser (player with lowest score)
router.get('/players/ranking/loser', playerController.player_loser);


module.exports = router;