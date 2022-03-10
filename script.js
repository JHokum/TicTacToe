
//Game module
const Game = (function(){
    let state = true;
    const changeState =function(){   //will change the state of the game
        if (state==true){
            state=false;
        }
        else{
            state=true;
        }
    }

    const getState = ()=>state;    //getter for state
    return {state,changeState,getState}   //return game object
})()    //module

const header = document.querySelector(".header");


//Gameboard module
const Gameboard = (function(){
    const gameboard = ["","","","","","","","",""];  //gameboard array
    const changeMark = function(){                  //function to change mark in array
        gameboard[3]="O";
    }
    
    return {gameboard, changeMark}
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
    const playerMarker=marker;
    const prototype = Player(1);
    return Object.assign({},prototype,{playerMarker});
}
//Computer player object will inherit Player (module)
 const Computer = (function(marker){
     const compMarker=marker;
     const prototype = Player(2);
     return Object.assign({},prototype,{compMarker});
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

//change the turn
const changeTurn = function(){
    if (turn==player1){
        turn=player2;
    }
    else{
        turn=player1;
    }
}

//Listener function
const listenerFunction = function(e){
    e.target.textContent=playerTurn(turn);
    changeTurn();
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
let player1;
let player2;
let turn;
// addEventListeners(markArray());



//workzone
const pvpButton = document.getElementById("pvp");

const pvpListenerFunction = function(){
    player1 = Human("X");
    player2 = Human("O");
    turn = player1;
    addEventListeners(markArray());
}

pvpButton.addEventListener("click",pvpListenerFunction);