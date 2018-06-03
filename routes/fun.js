var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('fun');
});

router.get('/smb2', function (req, res, next) {
  res.render('fun/smb2');
});

router.get('/conway', function (req, res, next) {
  res.render('fun/conway');
});

module.exports = router;
