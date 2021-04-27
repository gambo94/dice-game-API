const db = require('../config/dbConfig')

// query for inserting anonymous
const insertAnonymous = `
    INSERT INTO player (username, sign_up_date)
    VALUES (?, CURRENT_TIMESTAMP);
`;


// query for inserting unique user 
const insert = `
    INSERT INTO player (username, sign_up_date)
    VALUES (?, CURRENT_TIMESTAMP);
`;

// query for rolling dices by user, it creates a game row
const game = `
    INSERT INTO game (result, dice_one, dice_two, player_id)
    VALUES (?, ?, ?, ?)
`;

// query for the put method, it looks if old_username exists and gives back 1 if true and 0 if false
const exist = `
    SELECT exists(SELECT username FROM player WHERE username=?);
`;

const existId = `
    SELECT exists(SELECT username FROM player WHERE id_player=?);
`;

const update = `
    UPDATE player
    SET username = ?
    WHERE username = ?;
`;

// query for deleting all the game rows of a selected user (by id)
const remove = `
    DELETE FROM game
    WHERE player_id = ?;
`

// query for getting win percentage rate of every user
const rates = `
    SELECT id_player, username,
    COUNT(result) games_played,
    ROUND(100 * SUM(result = 'WIN') / COUNT(result)) winning_percent
    FROM player 
    left JOIN game ON id_player = player_id
    GROUP BY id_player;
`


// query for getting all the games fields of a player
const playerGames = `
    SELECT g.id_game id_game, p.username username, g.dice_one dice_one, g.dice_two dice_two, g.result result
    FROM game AS g
    INNER JOIN player AS p
    ON g.player_id = p.id_player
    WHERE g.player_id = ?;
`;

// query that returns all users and their winning rates
const playerPercentage = `
    SELECT username,
    ROUND(100 * SUM(result = 'WIN') / COUNT(result)) winning_percent
    FROM game
    INNER JOIN player ON player_id = id_player
    GROUP BY player_id;
`;

module.exports = {
    insertAnonymous, insert, game, exist, update, remove, rates, playerGames, playerPercentage, existId
}