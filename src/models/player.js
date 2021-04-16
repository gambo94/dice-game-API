const { Schema, model } = require('mongoose');


const playerSchema = new Schema(
    {
    username: {type: String, required: true, unique: true},
    games : [
        {
            dice_one: { type: Number},
            dice_two: { type: Number},
            result: {type : String},
            player_id: {type: String}
        }
    ]
    },
    { timestamps: true }
)

const Player = model('Player', playerSchema);

module.exports = Player;