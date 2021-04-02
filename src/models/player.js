// user table
const rollDices = require('../helpers/dices');

// this is a sort of schema for the user table
class Player {
    constructor(name){
        this.name = name || '';
    }

    play(){
        rollDices();
    }
}


