var express = require('express');
var router = express.Router();

router.get('/smb2', function (req, res, next) {
  res.render('fun/smb2');
});

module.exports = router;
