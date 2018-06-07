var cellSize, gameInterval, gameIntervalId, currentGen, nextGen, context, width, height, hCells, vCells

function launch () { // eslint-disable-line no-unused-vars
  cellSize = parseInt(document.getElementById('cellSize').value)
  gameInterval = parseInt(document.getElementById('gameInterval').value)
  var cellColor = document.getElementById('cellColor')
  var bgColor = document.getElementById('bgColor')
  var areaWidth = document.getElementById('areaWidth')
  var areaHeight = document.getElementById('areaHeight')

  var gameWindow = window.open('', '', 'scrollbar=no, width=' + areaWidth.value + ', height=' + areaHeight.value)
  gameWindow.document.body.setAttribute('style', 'margin:0;background-color:' + bgColor.value)

  var canvas = gameWindow.document.createElement('canvas')
  var gameCanvas = gameWindow.document.body.appendChild(canvas)
  gameCanvas.setAttribute('width', areaWidth.value)
  gameCanvas.setAttribute('height', areaHeight.value)

  context = gameCanvas.getContext('2d')
  context.fillStyle = '#' + cellColor.value

  width = gameCanvas.width
  height = gameCanvas.height

  hCells = Math.floor(width / cellSize)
  vCells = Math.floor(height / cellSize)

  gameWindow.f = function () { game() }
  gameWindow.f()
}

function game () {
  var initStatus
  var initGen = []

  // initial seed
  for (let i = 0; i < vCells; i++) {
    for (let j = 0; j < hCells; j++) {
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
  currentGen = []
  nextGen = []

  copyGen(initGen, currentGen)

  window.clearInterval(gameIntervalId)
  gameIntervalId = window.setInterval(function () {
    update()
    draw(nextGen)
    copyGen(nextGen, currentGen)
  }, gameInterval)
}

function copyGen (origGen, destGen) {
  for (let i = 0; i < origGen.length; i++) {
    destGen[i] = origGen[i].slice(0)
  }
}

function update () {
  var fieldCount

  copyGen(currentGen, nextGen)

  for (let i = 0; i < vCells; i++) {
    for (let j = 0; j < hCells; j++) {
      fieldCount = getLivingNeighbors(currentGen, i, j)
      if (currentGen[i][j]) { fieldCount++ }

      if (fieldCount === 3) { nextGen[i][j] = true } else if (fieldCount === 4) { } else { nextGen[i][j] = false }
    }
  }
}

function draw (gen) {
  context.clearRect(0, 0, width, height)
  var x = 0
  var y = 0

  for (let i = 0; i < vCells; i++) {
    for (let j = 0; j < hCells; j++) {
      if (gen[i][j]) { context.fillRect(x, y, cellSize, cellSize) }
      x += cellSize
    }
    y += cellSize
    x = 0
  }
}

function getLivingNeighbors (arr, i, j) {
  var count = 0

  if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1]) { count++ }
  if (i - 1 >= 0 && arr[i - 1][j]) { count++ }
  if (i - 1 >= 0 && j + 1 < hCells && arr[i - 1][j + 1]) { count++ }
  if (j + 1 < hCells && arr[i][j + 1]) { count++ }
  if (i + 1 < vCells && j + 1 < hCells && arr[i + 1][j + 1]) { count++ }
  if (i + 1 < vCells && arr[i + 1][j]) { count++ }
  if (i + 1 < vCells && j - 1 >= 0 && arr[i + 1][j - 1]) { count++ }
  if (j - 1 >= 0 && arr[i][j - 1]) { count++ }

  return count
}
