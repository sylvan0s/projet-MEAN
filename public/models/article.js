var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title:  String,
  author: String,
  content:  String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Article', ArticleSchema);