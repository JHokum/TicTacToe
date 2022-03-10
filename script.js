
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


//returns an array from node list
const markArray = function(){
    const markNodes = document.querySelectorAll(".mark");
    
    return Array.from(markNodes);
}


//placeholder function to determine the marker for the turn
const playerTurn = function(turn){
    let marker = "";
    if (turn==1){
        marker="x";
    }
    else
        marker="O";
    return marker;
}

//function for adding listeners
const addEventListeners = function(markArray){
    for (let mark of markArray){
        
        mark.addEventListener("click",e=>e.target.textContent=playerTurn(2));
    }
}


//add event listeners to mark boxes
addEventListeners(markArray());
