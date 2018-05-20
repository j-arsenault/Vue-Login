const dbfactory = require('./database.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const UIDGenerator = require('uid-generator')

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
    validate: [validator.isEmail, 'Invalid email']
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

Users.schema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

function addUser(firstName, lastName, email, password) {
  const uidgen = new UIDGenerator(512, UIDGenerator.BASE62)
  let new_user = new Users({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    emailConfirmationToken: uidgen.generateSync(UIDGenerator.BASE16),
    active: this.active,
    role: this.role,
    dateCreated: this.dateCreated
  })
  return new Promise((resolve, reject) => {
    new_user.save(function (error, user) {
      if (error) {
        reject(error)
      }
      // remove user: user, once done testing
      resolve({
        user: user,
        success: true,
        message: 'You\'ve successfully signed up!'
      })
    })
  })
}

function fetchByEmail(email) {
  return new Promise((resolve, reject) => {
    Users.findById(email, Object.keys(schema).join(" "), function (error, user) {
      if (error) {
        reject(error)
      }
      resolve(user)
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

function generateHash(password) {
  let salt = bcrypt.genSaltSync(10)
  return  bcrypt.hashSync(password, salt)
}

function compareHash(email) {
  return bcrypt.compare(email, hashedPassword)
}

module.exports = {
  addUser,
  fetchOne,
  fetchByEmail,
  updateOne,
  removeOne
}
