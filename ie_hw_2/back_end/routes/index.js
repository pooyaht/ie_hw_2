var express = require('express');
var router = express.Router();
var db_form = require('../models/form_data')
var db_field = require('../models/field')
var fs = require('fs')
var form_templates = {}


create_form = (data) => {
  var fields = []
  for (field of data.fields) {
    var new_field = new db_field(field)
    new_field.save()
    fields.push(new_field._id)
  }
  delete data.fields
  data.fields = fields
  var form = new db_form(data)
  form.save()
  return form
} 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/forms/', async (req, res, next) => {
  fs.readFile('./form_templates.json', function read(err, data) {
    if (err) {
        res.send(err);
    }
    res.send(data)
   });
})

router.get('/api/forms/:id/', (req, res, next) => {
  db_form.find({id: req.query.id}, (err, form) => {
    if (!err) {
      res.send(form)
    }
    else {
      res.send(err)
    }
  })
})

router.post('/api/submit_form/', async (req, res, next) => {
    res.send(create_form(req.body))
})

module.exports = router;