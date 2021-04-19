const { Schema, model } = require('mongoose');

// class Game {
//     constructor(dice_one, dice_two, result){
//         this.dice_one = dice_one;
//         this.dice_two = dice_two;
//         this.result = result;
//     }
// }

const gameSchema = new Schema(
    {
    dice_one : { type: Number, required: true},
    dice_two : { type: Number, required: true },
    result: { type: String, required: true},
    player_id: { type: String, require: true }
    },
    { timestamps: true }
)


const Game = model('Game', gameSchema);

module.exports = Game;

