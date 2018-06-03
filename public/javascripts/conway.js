const CELL_SIZE = 5

var canvas = document.getElementById('gameOfLife')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var context = canvas.getContext('2d')

var width = canvas.width
var height = canvas.height

var hCells = Math.floor(width / CELL_SIZE)
var vCells = Math.floor(height / CELL_SIZE)

var gameWidth = hCells * CELL_SIZE
var gameHeight = vCells * CELL_SIZE

var x, y

function game () {

  var i, j, initStatus
  var initGen = []

  x = 0
  y = 0

  // initial seed
  for (i = 0; i < vCells; i++) {
    for (j = 0; j < hCells; j++) {
      initStatus = Math.floor(Math.random() * 10)
      
      if (initStatus < 5) {
        if (!initGen[i]) { initGen[i] = [] }
        initGen[i][j] = true
      } else {
        if (!initGen[i]) { initGen[i] = [] }
        initGen[i][j] = false
      }
    }
  }
  draw(initGen)
}

function update (currentGen) {
  var i, j, fieldCount
  var nextGen = []

  for (i = 0; i < currentGen.length; i++) {
    nextGen[i] = currentGen[i].slice()
  }

  for (i = 0; i < vCells; i++) {
    for (j = 0; j < hCells; j++) {
      fieldCount = getLivingNeighbors(currentGen, i, j)
      if (currentGen[i][j]) { fieldCount++ }

      if (fieldCount === 3) { nextGen[i][j] = true }
      else if (fieldCount === 4) { } // do nothing
      else { nextGen[i][j] = false }
    }
  }
  draw(nextGen)
}

function draw (gen) {
  context.clearRect(0, 0, width, height)
  x = 0
  y = 0

  for (i = 0; i < vCells; i++) {
    for (j = 0; j < hCells; j++) {
      if(gen[i][j]) { context.fillStyle = 'black' }
      else { context.fillStyle = 'white' }

      context.fillRect(x, y, CELL_SIZE, CELL_SIZE)
      x += CELL_SIZE
    }
    y += CELL_SIZE
    x = 0
  }
  setTimeout(function () { update(gen) }, 50)
}

function getLivingNeighbors(arr, i, j) {
  var count = 0

  if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1])         { count++ }
  if (i - 1 >= 0 && arr[i - 1][j])                           { count++ }
  if (i - 1 >=0 && j + 1 < hCells && arr[i - 1][j + 1])      { count++ }
  if (j + 1 < hCells && arr[i][j + 1])                       { count++ }
  if (i + 1 < vCells && j + 1 < hCells && arr[i + 1][j + 1]) { count++ }
  if (i + 1 < vCells && arr[i + 1][j])                       { count++ }
  if (i + 1 < vCells && j - 1 >= 0 && arr[i + 1][j - 1])     { count++ }
  if (j - 1 >= 0 && arr[i][j - 1])                           { count++ }

  return count
}
