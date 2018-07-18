var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BlogPostSchema = new Schema(
  {
    title: {type: String, required: true},
    caption: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, required: true}
  },
  {
    collection: 'inventory'
  }
)

BlogPostSchema
  .virtual('url')
  .get(function () {
    return '/blog/post/' + this._id
  })

module.exports = mongoose.model('BlogPost', BlogPostSchema)
