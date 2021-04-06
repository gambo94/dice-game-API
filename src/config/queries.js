const db = require('./dbConfig')

// query for inserting anonymous
const insertAnonymous = `
    INSERT INTO player (sign_up_date)
    VALUES (CURRENT_TIMESTAMP);
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

// query for the put method, it looks if old_username exists
const exist = `
    SELECT exists(SELECT username FROM player WHERE username=?);
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


module.exports = {
    insertAnonymous, insert, game, exist, update, remove
}