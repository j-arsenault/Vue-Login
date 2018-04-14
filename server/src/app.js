const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())


// SET UP DATABASE DO NOT REMOVE
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/login-test')
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})
// END DATABASE SETUP

// configure routes here
require('../routes/users')(app)

// test server works localhost:8081/users
app.get('/users', (req, res) => {
  res.send(
    [{
      firstName: "Ian",
      lastName: "Arsenault",
      dateCreated: new Date()
    }]
  )
})


require('express-debug')(app)

module.exports = app
