function startGame() { // eslint-disable-line no-unused-vars
  var gameWindow = window.open('')
  var canvas = gameWindow.document.createElement('canvas')
  canvas.id = 'gameOfLife'
  var gameCanvas = gameWindow.document.body.appendChild(canvas)
  var gameScript = gameWindow.document.createElement('script')
  gameScript.src = '/javascripts/conway.js'
  gameWindow.document.body.appendChild(gameScript)
  gameWindow.onload = game
}
