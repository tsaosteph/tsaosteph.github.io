'use strict';
let red = 0;
let blue = 0;
let green = 0;
let rainbowize = false;
let eraser = false;

const gridContainer = document.querySelector("#grid-container");


userRequest(); // start program

function userRequest(){

    const gridSize = document.querySelector('#grid-input').value;

    if (gridSize >= 2 && gridSize <= 100)
    {
        //remove all squares to erase old grid
        while(gridContainer.firstChild)
        {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    
        //make new grid
        createGrid(gridSize, gridSize);
    }
}

/*
function userRequest(){
    let validNum = false;
    while (validNum == false)
    {   
        const gridSize = prompt("Please enter grid size between 2 and 100");

        if (gridSize >= 2 && gridSize <= 100)
        {
            validNum = true;
            createGrid(gridSize, gridSize);
        }
    }
}
*/

function createGrid(rows, columns)
{
    //set up container for grid of rows and columns
    gridContainer.style.setProperty("grid-template-columns", `repeat(${columns}, 2fr)`);
    gridContainer.style.setProperty("grid-template-rows", `repeat(${rows}, 2fr)`);

    //create squares
    let numSquares = rows * columns;

    for(let i = 0; i < numSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("mouseover", () => changeColor(square));
        gridContainer.appendChild(square);
    };

    //change color of color display and grid colors
    document.querySelector("#red-slider").addEventListener('click', changeColor);
    document.querySelector("#green-slider").addEventListener('click', changeColor);
    document.querySelector("#blue-slider").addEventListener('click', changeColor);

    //if rainbow button pushed, set colors to rainbow
    document.querySelector("#rainbow-button").addEventListener('click', () => rainbowize = true);

    //if eraser pushed, set color to white
    document.querySelector("#eraser").addEventListener('click', () => eraser = true);

    document.querySelector("#grid-input-submit").addEventListener('click', userRequest);
    document.querySelector("#clear-board").addEventListener('click', userRequest);

}

function changeColor(square)
{
    //if color manually selected, set color to selection
    if (rainbowize == false){
        red = document.querySelector("#red-slider").value;
        green = document.querySelector("#green-slider").value;
        blue = document.querySelector("#blue-slider").value;    
    }
    else //if rainbowize is on, randomly select color
    {
        changeRainbowColor();
    }
    
    //set color of color display
    document.querySelector("#color-display").style.setProperty("background-color", `rgb(${red},${green},${blue}`);

    //set color of grid square
    square.style.setProperty("background-color", `rgb(${red},${green},${blue}`);

    //turn off rainbowize if user goes back to manual color selection or if user is using eraser
    document.querySelector("#red-slider").addEventListener('click', ()=>rainbowize=false);
    document.querySelector("#green-slider").addEventListener('click', ()=>rainbowize=false);
    document.querySelector("#blue-slider").addEventListener('click', ()=>rainbowize=false);


    if (eraser == true)
    {
        square.style.setProperty("background-color", `rgb(255,255,255)`);   
        document.querySelector("#eraser").addEventListener('click', ()=>rainbowize=false);
        
    }

    //turn off eraser if user goes back to manual color selection or rainbow selection
    document.querySelector("#red-slider").addEventListener('click', ()=>eraser = false);
    document.querySelector("#green-slider").addEventListener('click', ()=>eraser=false);
    document.querySelector("#blue-slider").addEventListener('click', ()=>eraser=false);
    document.querySelector("#rainbow-button").addEventListener('click',()=>eraser = false);

}

function changeRainbowColor()
{
    red = Math.floor(Math.random() * 256);//get random integer between 0 and 255
    green = Math.floor(Math.random() * 256);   
    blue = Math.floor(Math.random() * 256);
}

