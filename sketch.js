// GLOBAL DECLARATIONS

let grid;
let rows;
let cols;
let h;
let w;
let flag = false;
let resolution = 5;

// MY FUNCTIONS

const onex = document.getElementById('1');
const twox = document.getElementById('2');
const fourx = document.getElementById('4');
const eightx = document.getElementById('8');

onex.addEventListener("click", () => {
  resolution = 5;
});
twox.addEventListener("click", () => {
  resolution = 10;
});
fourx.addEventListener("click", () => {
  resolution = 25;
});
eightx.addEventListener("click", () => {
  resolution = 50;
});

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
  function myFunction(x) {
    if (x.matches) {
      h = 300;
      w = 300;
    } else {
      h = 500;
      w = 500;
    }
  }
  
  var x = window.matchMedia("(max-width: 600px)")
  myFunction(x)
  var canvas = createCanvas(h, w);
  line(0, 0, width, height);
  canvas.parent('sketch-holder');
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));      
    }
  }
  console.log(grid);
  // console.log(colorChooser());
}

function draw() {
  background(173, 216, 230);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(252, 82, 111);
        stroke(173, 216, 230);
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
  const starter = document.getElementById('starter');
  const stopper = document.getElementById('stopper');
  const resetter = document.getElementById('resetter');

  starter.addEventListener("click", () => {
    flag = true;
  });
  stopper.addEventListener("click", () => {
    flag = false;
  })

  if (flag) {
    grid = next;
  }

  resetter.addEventListener("click", () => {
    flag = false;
    setup();
  })
}