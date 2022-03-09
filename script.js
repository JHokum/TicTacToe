
//Gameboard module
const Gameboard = (function(){
    const gameboard = [];
    const meow = ()=>console.log("meow");
    return {gameboard,meow}
})();

//Player factory
const Player = function(select){
    const name = "";
    const marker="";

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

Gameboard.meow();