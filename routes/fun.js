var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('fun', { title: 'fun' })
})

router.get('/conway', function (req, res, next) {
  res.render('fun/conway', { title: 'conway\'s game of life' })
})

module.exports = router
