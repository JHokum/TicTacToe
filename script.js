
//Gameboard module
const Gameboard = (function(){
    const gameboard = ['X','O','O','O','X','X','X','X','O'];
    
    return {gameboard}
})();

const Display = (function(){
    const displayBoard = function(gameboard){
        const body = document.querySelector("body");
        console.log(gameboard);
        for (let marker of gameboard){
            let mark = document.createElement("span");
            mark.textContent=marker;
            console.log(`marker ${marker}`)
            body.appendChild(mark);
        }
    }
    return{displayBoard};
    
})()

//Player factory
const Player = function(select){
    const name = "";
    const marker="";
    
    //Will return Human or computer
    
    switch(select){
        case 1:
            name="Human";
            marker="X";
            return {name,marker};
        case 2:
            name="Computer";
            marker="O";
            return {name,marker};
        default:
            return {};
    }
}
//Human player object will inherit Player

//Computer player object will inherit Player

Display.displayBoard(Gameboard.gameboard);