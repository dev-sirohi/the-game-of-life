// GLOBAL DECLARATIONS

let grid;
let rows;
let cols;
let resolution = 5;

// MY FUNCTIONS

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);    
  }
  return arr;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + cols + i) % cols;
      let row = (y + rows + j) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

// SETUP AND DRAW

function setup() {
  createCanvas(1200, 1200);
  
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));      
    }
  }
  console.log(grid);
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(204, 104, 0);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // Compute the next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Count live neighbors!
      let neighbors = countNeighbors (grid, i, j) ;

      // Current state
      let state = grid[i][j];

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}