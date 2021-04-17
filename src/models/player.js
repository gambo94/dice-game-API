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

// creating a method to get the _id and the object {_id: <id>}
playerSchema.methods.getId = function(){
    return this.id;
}

playerSchema.methods.getIdObj = function(){
    return {
        '_id': this.id
    }
}
const Player = model('Player', playerSchema);

module.exports = Player;