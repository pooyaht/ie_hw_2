var mongoose = require('mongoose')
var database = require('./get_db')

const formSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  id: {
    type: Number,
  },
  fields: [{type: mongoose.Schema.ObjectId, ref: 'Field'}]
})

const form = mongoose.model('Form', formSchema)

module.exports = form