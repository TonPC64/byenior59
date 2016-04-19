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

app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'))

app.post('/register', jsonParser, (req, res) => {
  users.find({ sid: req.body.data }, (err, data) => {
    if (err === null) res.send(data)
    else res.sendStatus(400)
  })
})

app.post('/insert', jsonParser, (req, res) => {
  var insert = new Registers(req.body.data)
  // insert.save()
  res.send(insert)
})

app.listen(app.get('port'), () => {
  console.log('Server Start at port ', app.get('port'))
})
