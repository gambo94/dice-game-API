
const db = require('../config/dbConfig');
const query = require('../config/queries');

// creates a player
const player_create_post = (req, res) => {
    if(req.body.username === ""){
        db.query(query.insertAnonymous, (err, row, fields) =>{
            if(!err){
                res.json('Successfully saved');
            } else {
                throw err;
            }
        })
    } else {
        let username = req.body.username;
        db.query(query.insert, username, (err, row, fields) =>{
            if(!err){
                res.json('Successfully saved');
            } else {
                throw err;
            }
        })
    }
}

// player_index gets list of user


// player_details gets single user


// player_delete


module.exports = {
    player_create_post
}