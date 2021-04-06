// generating the two dices' values


const rollDices = () => {
    let numOne = Math.floor(Math.random() * 7) +1;
    let numTwo = Math.floor(Math.random() * 7) +1;
    let dicePair = [numOne, numTwo];
    return dicePair;
}

module.exports = rollDices;





// function randomOne(){
//     let ranOne = Math.floor(Math.random() * 7) +1;
//     return ranOne;
// }

// function randomTwo(){
//     let ranTwo = Math.floor(Math.random() * 7) +1;
//     return ranTwo;
// }

// let count = 0;
// const result = () => {
//     let numOne = randomOne();
//     let numTwo = randomTwo();
//     if(numOne === 7 && numTwo ===7){
//         console.log(numOne, numTwo, count);
//         count = 0;
//         return;
//     } else{
//         count++
//         return result();
//     }
// }
