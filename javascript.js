const grid = document.getElementById("gridContainer");
const slider = document.getElementById("gridSizeSlider");
const value = document.getElementById("sizeVariable");
const button = document.getElementById("createGrid");
const colorPicker = document.getElementById("colorpicker");

const DEFAULTCOLOR = '#000000';
const gridWidth = 500;

colorPicker.onchange = (e) => setCurrentColor(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

console.log(gridWidth);

let gridSize = 32;

button.onclick = function(){
    clearGrid();
    createGrid(gridSize);
}

slider.oninput = function(){
    value.innerHTML=this.value;
    gridSize=this.value;
}

function clearGrid(){
    grid.innerHTML='';
}

function paint(e){
    if (e.type === 'mouseover' && !mouseDown) return
    this.style.backgroundColor = 'black';
    //`background-color: black`;
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
            cell.addEventListener("mouseover",paint)
            cell.addEventListener("mousedown",paint)
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

