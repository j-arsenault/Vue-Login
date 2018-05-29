const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const session = require('express-session')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/login')
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})

app.set('trust proxy', 1) // trust first proxy
// track login sessions
app.use(session({
  secret: 'doin thangs',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,  // 1 month cookie
    secure: false // true requires an https-enabled website
  }
}))


// configure routes here
require('../routes/users')(app)

require('express-debug')(app)

module.exports = app
