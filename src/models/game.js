// creating this class to generate a game object to be pushed into games array in player document

class Game {
    constructor(dice_one, dice_two, result){
        this.dice_one = dice_one;
        this.dice_two = dice_two;
        this.result = result;
    }
}


module.exports = Game;