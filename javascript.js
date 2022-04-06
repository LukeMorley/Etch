//Grab all the HTML elements we will be using to change behaviours
const grid = document.getElementById("gridContainer");
const slider = document.getElementById("gridSizeSlider");
const value = document.getElementById("sizeVariable");
const colorPicker = document.getElementById("colorpicker");
const clearButton = document.getElementById("clearGrid");
const classicButton = document.getElementById("hover");
const clickButton = document.getElementById("click");
const rainbowButton = document.getElementById("rainbow");

//Setup default values
const DEFAULTCOLOR = '#000000';
const gridWidth = 600;
let currentColor = DEFAULTCOLOR;
let mode = 'click&drag';
let mouseDown = false;
let rainbowMode = false;
let gridSize = 50;

//Set functions to buttons & mouse behaviour when dragging outside the
//paintable area
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
window.onmouseup = () => (mouseDown = false);
document.onmouseleave = () => (mouseDown = false);
colorPicker.onchange = (e) => currentColor = e.target.value;
classicButton.onclick = () => setMode('classic');
clickButton.onclick = () => setMode('click&drag');
rainbowButton.onclick = () => toggle();
clearButton.onclick = () => clearGrid();

//Turn Rainbow mode on or off
function toggle(){
    if(!rainbowMode){
        rainbowMode = true;
        rainbowButton.classList.add('active');
    }else{
        rainbowMode = false;
        rainbowButton.classList.remove('active');
    }
}

//Set the text above the grid size slider upon changing
slider.oninput = function(){
    value.innerHTML=this.value+' X '+this.value;
    gridSize=this.value;
    clearGrid();
}

//Generate a random Hex colour for Rainbow Mode
let randomHex = () => {
    let i = (Math.random()* 0xfffff * 1000000).toString(16);
    return '#'+i.slice(0,6);
}

//Clear current grid & create a new one
function clearGrid(){
    grid.innerHTML='';
    createGrid(gridSize);
}

//Paint the current tile depending on the current settings
function paint(e){
    if(mode=='classic'){
        if(rainbowMode){
            newColor = randomHex();
            this.style.backgroundColor = newColor;
            colorPicker.value = newColor;
            return;
        }
        this.style.backgroundColor = currentColor;
    }else if(mode=='click&drag'){
        if (e.type === 'mouseover' && !mouseDown) return;
        if(rainbowMode){
            newColor = randomHex();
            this.style.backgroundColor = newColor;
            colorPicker.value = newColor;
            return;
        }
        this.style.backgroundColor = currentColor;
    }
}

//Generate the initial grid
window.onload = function(){
    createGrid(gridSize);
    clickTheButton('click&drag');
}

//Generate a new grid
function createGrid(gridSize){
    let cellSize = gridWidth/gridSize;
    for(let i = 0; i<gridSize; i++){
        let row = document.createElement("div");
        row.className="row";
        for(let j = 1; j<=gridSize; j++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.style.height = cellSize.toString()+'px';
            cell.style.width = cellSize.toString()+'px';
            cell.setAttribute('draggable',false);
            cell.setAttribute('ondragstart',"return false");
            cell.addEventListener("mouseover",paint);
            cell.addEventListener("mousedown",paint);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

//Helper function to update the mode var
function setMode(newMode){
    clickTheButton(newMode);
    mode = newMode;
}

//Toggle between classic or click mode
function clickTheButton(newMode){
    if(mode=='click&drag'){
        clickButton.classList.remove('active');
    }else if (mode=='classic'){
        classicButton.classList.remove('active');
    }
    if(newMode=='click&drag'){
        clickButton.classList.add('active');
    }else if (newMode=='classic'){
        classicButton.classList.add('active');
    }
}