
const db = require('../config/dbConfig');
const query = require('../config/queries');
const rollDice = require('../helpers/dices');

// creates a player
const player_create_post = (req, res) => {
    // if no user found inserts anonymous player
    if(req.body.username === ""){
        db.query(query.insertAnonymous, (err, row, fields) =>{
            if(!err){
                res.json('Successfully saved');
            } else {
                throw err;
            }
        })
    } else {
        // inserts a player with unique username
        let username = req.body.username;
        db.query(query.insert, username, (err, row, fields) =>{
            if(!err){
                res.json('Successfully saved');
            } else {
                throw new Error('User already exists, please select another one');
            }
        })
    }
}

// player_plays_post plays a game
const player_plays_post = (req, res) => {
    // rolling dices and storing the results in array
    let dicesArray = rollDice();
    let result = '';
    let player_id = req.params.id;
    // checking if player won
    if (dicesArray[0] === 7 && dicesArray[1] ===7){
        result = 'WIN';
    } else {
        result = 'LOSE';
    }
    db.query(query.game, [result, dicesArray[0], dicesArray[1], player_id], (err, row, fields) =>{
        if(!err){
            res.json('Dices rolled!');
        } else {
            throw new Error('User with this id not found');
        }
    })
}


// player_update_put updates username
const player_update_put = (req, res) => {
    // receives a body with old_username and new_username
    let old_username = req.body.old_username;
    let new_username = req.body.new_username;
    db.query(query.exist, old_username, (err, row, fields) =>{
        if(!err){
            let queryName = fields[0].name; // name of column
            let result = row[0][queryName];
            console.log(row[0][queryName]); // result of the query 1 = true; 0 = false
            if(result === 1){
                db.query(query.update, [new_username, old_username], (err, row, fields) =>{
                    if(!err){
                        res.json('Username updated successfully');
                    }else{
                        throw err;
                    }
                })
            } else {
                throw new Error('The username you are looking for was not found');
            }
        } else {
            throw err;
        }
    });
}

// player_deleteGame_delete
const player_deleteGame_delete = (req, res) => {
    let player_id = req.params.id;
    console.log(player_id);
    // checking if player won
    db.query(query.remove, player_id, (err, row, fields) =>{
        if(!err){
            res.json('All games of selected user removed');
        } else {
            throw new Error('User with id selected not found');
        }
    })
}

// player_index gets list of user


// player_details gets single user


// player_delete


module.exports = {
    player_create_post, player_plays_post, player_update_put, 
    player_deleteGame_delete
}