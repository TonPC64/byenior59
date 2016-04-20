var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var app = express()
mongoose.connect('mongodb://localhost/byenior')
var Schema = mongoose.Schema
var thingSchema = new Schema({}, { strict: false })
var users = mongoose.model('users', thingSchema)
var Registers = mongoose.model('registers', thingSchema)

app.set('port', (process.env.PORT || 80))
app.use(express.static('public'))

app.get('/register', function (req, res) {
  Registers.find(function (err, data) {
    if (err === null) res.send(data)
    else res.sendStatus(400)
  })
})

app.post('/checkRegis', jsonParser, function (req, res) {
  Registers.find({ sid: req.body.data }, function (err, data) {
    if (err === null) {
      res.send(data)
    }
    else res.sendStatus(400)
  })
})

app.post('/register', jsonParser, function (req, res) {
  users.find({ sid: req.body.data }, function (err, data) {
    if (err === null) res.send(data)
    else res.sendStatus(400)
  })
})

app.post('/insert', jsonParser, function (req, res) {
  var insert = new Registers(req.body.data)
  insert.save()
  res.send(insert)
})

// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('public/resource/data.json', 'utf8'))
// obj.data.forEach( (item) => {
//   var insert = new users(item)
//   insert.save()
// })

app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})
