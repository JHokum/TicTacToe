
//Player factory
const Player = function(select){
    let name = "";
    
    
    //Will return Human or computer
    
    switch(select){
        case 1:
            name="Human";
            
            return {name};
            
        case 2:
            name="Computer";
            
            return {name};
        default:
            break;
    }
}

//Human player object will inherit Player
const Human = function(marker){
    const playerMarker=marker;  //set playerMarker to x or o
    const prototype = Player(1);  //Human object from Player factory
    const getPlayerMarker = ()=>playerMarker;    //playerMarker getter
    return Object.assign({},prototype,{playerMarker,getPlayerMarker});  //return a completed object with combined prototype and Human object
}
//Computer player object will inherit Player (module)
 const Computer = (function(marker){
     const compMarker=marker;  //compMarker set to x or o
     const prototype = Player(2);  //Computer object from Player factory
     return Object.assign({},prototype,{compMarker});  //return a completed object with combined prototype and Computer object
 })()



//Game module
const Game = (function(){
    let player1;
    let player2;
    let turn;
    
    let state = true;
    const changeState =function(){   //will change the state of the game
        if (state==true){
            state=false;
        }
        else{
            state=true;
        }
    }
    const gameStart = function(gameType){
        switch(gameType){  //player vs player or vs cpu
        
            case(1):
                player1 = Human("x");
                player2 = Human("o");
                turn = player1;
                break;
            case(2):
                player1 = Human("x");
                player2 = Human("z");
                turn = player1;
                break;
            default:
                break;
        }
    }

    //change the turn
    const changeTurn = function(){
        if (turn==player1){
            turn=player2;
        }
        else{
            turn=player1;
        }
    }
    const getTurn = ()=>turn;      //getter for turn
    const getState = ()=>state;    //getter for state
    const getPlayer = function(select){   //get player1 or player2
        switch(select){
            case(1):
                return player1;
            case(2):
                return player2;
            default:
                break;
        }
    }
    return {gameStart,changeState,getState,getPlayer,getTurn,changeTurn}   //return game object
})()    //module




//Gameboard module
const Gameboard = (function(){
    const gameboard = ["","","","","","","","",""];  //gameboard array
    const colBoard = [["","",""],["","",""],["","",""]];  //arranged as an array of columns
    const rowBoard = [["","",""],["","",""],["","",""]];  //arranged as an array of rows
    const changeMark = function(col,row,mark){                  //function to change mark in array
        colBoard[col][row]=mark;
        rowBoard[row][col]=mark;
    }
    const getColBoard = () => colBoard;  //get column array
    const getRowBoard = () => rowBoard;  //get row array
    
    return {gameboard,colBoard,rowBoard,getRowBoard,getColBoard, changeMark}
})();


//WIP Display module
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




//returns an array from node list
const markArray = function(){
    const markNodes = document.querySelectorAll(".mark");
    
    return Array.from(markNodes);
}


//placeholder function to determine the marker for the turn
const playerTurn = function(player){
    return player.playerMarker
}



//Listener function
const listenerFunction = function(e){
    e.target.textContent=playerTurn(Game.getTurn());
    
    
    Gameboard.changeMark(e.target.dataset.col,e.target.dataset.row,e.target.textContent)
    if(winCheck(e.target.dataset.col,e.target.dataset.row)){
        alert("Winner winner chicken dinner");
        let zoop = Array.from(document.querySelectorAll("[data-row='1']"))
        for (let zeep of zoop){
            zeep.classList.add("winner");
        }
    }
    console.log(winCheck(e.target.dataset.col,e.target.dataset.row));
    e.target.removeEventListener("click",listenerFunction);
    Game.changeTurn();
}
//function for adding listeners
const addEventListeners = function(markArray){
    for (let mark of markArray){
        
        // mark.addEventListener("click",e=>e.target.textContent=playerTurn(turn));
        mark.addEventListener("click",listenerFunction);
    }
}


//add event listeners to mark boxes
// const player1 = Human("X");
// const player2 = Human("O");

// addEventListeners(markArray());
const header = document.querySelector(".header");
// Game.gameStart(2);

//workzone -------------------------------------------------
const pvpButton = document.getElementById("pvp");

const pvpListenerFunction = function(){
    Game.gameStart(1);
    addEventListeners(markArray());
}

pvpButton.addEventListener("click",pvpListenerFunction);

//game creator


//win check
/* Based on the selection we know where we are in the row or column.
Based on the row or column we can look at the row and column to check for win condition.
There is probably an array we can use for this.*/
const winCheck = function(col,row){
    return Gameboard.getColBoard()[col].every(markArrayChecker) || Gameboard.getRowBoard()[row].every(markArrayChecker);
}

const markArrayChecker = function(element){
    
   return element == Game.getTurn().getPlayerMarker();

}