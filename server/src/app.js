const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// SET UP DATABASE DO NOT REMOVE
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/members')
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})
// END DATABASE SETUP

// configure routes here

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
