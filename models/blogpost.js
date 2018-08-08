var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var BlogPostSchema = new Schema(
  {
    title: {type: String, required: true},
    caption: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, required: true},
    edited: {type: Date, required: false}
  },
  {
    collection: 'blog'
  }
)

BlogPostSchema
  .virtual('url')
  .get(function () {
    return '/blog/post/' + this._id
  })

BlogPostSchema
  .virtual('date_formatted')
  .get(function () {
    return moment(this.date).format('L')
  })

module.exports = mongoose.model('BlogPost', BlogPostSchema)
