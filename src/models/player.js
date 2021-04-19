const { Schema, model } = require('mongoose');


const playerSchema = new Schema(
    {
    username: {type: String, required: true, unique: true}
    },
    { timestamps: true }
)

// creating a method to get the _id 
playerSchema.methods.getId = function(){
    return this.id;
}



const Player = model('Player', playerSchema);

module.exports = Player;