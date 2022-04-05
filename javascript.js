const grid = document.getElementById("gridContainer");
const slider = document.getElementById("gridSizeSlider");
const value = document.getElementById("sizeVariable");
const button = document.getElementById("createGrid");
const colorPicker = document.getElementById("colorpicker");
const clearButton = document.getElementById("clearGrid");
const classicButton = document.getElementById("hover");
const clickButton = document.getElementById("click");

const DEFAULTCOLOR = '#000000';
const gridWidth = 600;
let currentColor = DEFAULTCOLOR;
let mode = 'click&drag'

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
window.onmouseup = () => (mouseDown = false);
document.onmouseleave = () => (mouseDown = false);

colorPicker.onchange = (e) => currentColor = e.target.value;

let gridSize = 32;

button.onclick = function(){
    clearGrid();
}

classicButton.onclick = function(){
    setMode('classic');
}

clickButton.onclick = function(){
    setMode('click&drag');
}

clearButton.onclick = function(){
    clearGrid();
}

slider.oninput = function(){
    value.innerHTML=this.value+' X '+this.value;
    gridSize=this.value;
}

function clearGrid(){
    grid.innerHTML='';
    createGrid(gridSize);
}

function paint(e){
    if(mode=='classic'){
        this.style.backgroundColor = currentColor;
    }else{
        if (e.type === 'mouseover' && !mouseDown) return
        this.style.backgroundColor = currentColor;
    }
}

window.onload = function(){
    createGrid(gridSize);
    clickTheButton('click&drag');
}

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
            cell.addEventListener("mouseover",paint)
            cell.addEventListener("mousedown",paint)
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function setMode(newMode){
    clickTheButton(newMode);
    mode = newMode;
}

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