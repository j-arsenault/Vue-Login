const dbfactory = require('./database.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const UIDGenerator = require('uid-generator')
const _ = require('lodash')
const uniqueValidator = require('mongoose-unique-validator')
const sgMail = require('@sendgrid/mail')
require('dotenv').config({path:'./config/sendgrid.env'})


const schema = {
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'Your first name is too short'],
    maxlength: [50, 'Your first name is too long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [3, 'Your last name is too short'],
    maxlength: [100, 'Your last name is too long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Invalid email'],
    index: { unique: true }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Your password must be at least 8 characters'],
  },
  emailConfirmationToken: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  dateCreated: {
    type: Date,
    default: moment().format()
  }
}


const Users = dbfactory("Users", schema)

// Checks for already existing unique values
Users.schema.plugin(uniqueValidator)


Users.schema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    })
  })
})


function addUser(request) {
  const uidgen = new UIDGenerator(512, UIDGenerator.BASE62)
  let new_user = new Users({
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    password: request.password,
    emailConfirmationToken: uidgen.generateSync(UIDGenerator.BASE16),
    active: this.active,
    role: this.role,
    dateCreated: this.dateCreated
  })
  return new Promise((resolve, reject) => {
    new_user.save(function (error, user) {
      if (error) {
        reject(error)
      } else {
        // Send email verification
        //sendEmailVerification(user)

        // remove user: user, once done testing
        let cleanUser = user.toObject()
        delete cleanUser._id
        delete cleanUser.password
        delete cleanUser.__v
        delete cleanUser.emailConfirmationToken
        cleanUser.password = ''
        resolve({
          user: cleanUser,
          success: true,
          message: 'You\'ve successfully signed up!'
        })
      }
    })
  })
}


function loginUser(request) {
  return new Promise((resolve, reject) => {
    Users.
      findOne({ email: request.email})
      .where('active').equals(true)
      .exec(function (error, user) {
        if (error) {
          reject(error)
        } else if (!user) {
          let err = new Error('Email does not exist')
          err.status = 400
          reject(err)
        } else {
          bcrypt.compare(request.password, user.password, function (error, isMatch) {
            if (!isMatch) {
              let err = new Error('Wrong email or password.')
              err.status = 401
              reject(err)
            } else {
              // return clean user object
              let cleanUser = user.toObject()
              delete cleanUser.password
              delete cleanUser.__v
              delete cleanUser.emailConfirmationToken
              cleanUser.password = ''
              resolve(cleanUser)
            }
          })
        }
    })
  })
}

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Users.findById(id, Object.keys(schema).join(" "), function (error, user) {
      if (error) {
        reject(error)
      }
      resolve(user)
    })
  })
}

function updateOne(id, userObj) {
  return new Promise((resolve, reject) => {
    Users.findById(id, Object.keys(schema).join(" "), function (error, user) {
      if (error) {
        reject(error)
      }

      user.firstName = userObj.firstName
      user.lastName = userObj.lastName
      user.password = userObj.password
      user.active = userObj.active

      user.save(function (error) {
        if (error) {
          reject(error)
        }
        resolve(true)
      })
    })
  })
}

function removeOne(id) {
  return new Promise((resolve, reject) => {
    Users.remove({
      _id: id
    }, function (error, user) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

function sendEmailVerification(user) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: user.email,
    from:  process.env.NO_REPLY_EMAIL,
    subject: process.env.SUBJECT,
    html: '<p>Hello, thank you for signing up with <strong>Lynxmasters</strong>!<br>Please click the following link to verify your email.<br></p><a href="http://localhost:8080/?id=' + user._id +'&email_id=' + user.emailConfirmationToken + '" target="_blank">Verify your email for Lynxmasters</a>',
  };
  sgMail.send(msg)
}

module.exports = {
  addUser,
  fetchOne,
  updateOne,
  removeOne,
  loginUser
}
