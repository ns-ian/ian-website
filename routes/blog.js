var express = require('express')
var router = express.Router()

var blogController = require('../controllers/blogController')

router.get('/', blogController.blogpost_list)

router.get('/post/:id', blogController.blogpost_full)

module.exports = router
