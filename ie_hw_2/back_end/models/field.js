var mongoose = require('mongoose')
var database = require('./get_db')

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  field_type: {
    type: String,
    enum: ['Text', 'Number', 'Location', 'Date'],
  },
  validation: {
    type: Object
  },
  options: {
    type: Object
  },
  value:{
    type: String
  }
})

fieldSchema.methods.to_json = function () {
  return {
    name: this.name,
    title: this.title,
    field_type: this.field_type,
    required: this.required,
    options: this.options,
  }
}

const field = mongoose.model('Field', fieldSchema)

module.exports = field