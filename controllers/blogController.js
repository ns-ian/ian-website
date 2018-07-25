var blogpost = require('../models/blogpost')

exports.blogpost_list = function (req, res, next) {
  blogpost.find()
    .sort({ date: -1 })
    .exec(function (err, posts) {
      if (err) { return next(err) }
      res.render('blog/index', { post: posts })
    })
}

exports.blogpost_full = function (req, res, next) {
  blogpost.findById(req.params.id, function (err, fullPost) {
    if (err) { return next(err) }
    res.render('blog/fullpost', { post: fullPost })
  })
}
