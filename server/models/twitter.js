const dbfactory = require('./database.js');

const schema = {
  twitter_id: {
    type: Number,
    required: [true, 'twitter_id is required']
  },
  twitter_user_id: {
    type: Number,
    required: [true, 'twitter user id is required']
  },
  username: {
    type: String,
    required: [true, 'username must be specified']
  },
  access_token: {
    type: String,
    required: [true, 'access_token is required to be connected to account']
  },
  is_linked: Boolean,
  required: [true, 'must know if account is connected']
};

const Twitter = dbfactory("Twitter", schema);

function addtwitter(twitter_id, TCHuser_id, username, access_token, is_linked) {
  let new_twitter =     new Twitter({
    twitter_id:         twitter_id,
    twitter_user_id:    twitter_user_id,
    username:           username
    access_token:       access_token
    is_linked:          is_linked
  })
  return new Promise((resolve, reject) => {
    new_twitter.save(function (error, twitter) {
      if (error) {
        reject(error)
      }
      resolve({
        twitter: twitter,
        success: true,
        message: 'Successful twitter connected account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Twitter.findById(id, Object.keys(schema).join(" "), function (error, twitter) {
      if (error) {
        reject(error)
      }
      resolve(twitter)
    })
  })
};

function updateOne(id, twitterObj) {
  return new Promise((resolve, reject) => {
    Twitter.findById(id, Object.keys(schema).join(" "), function (error, twitter){
      if (error){
        reject(error)
      }
      twitter.twitter_id          = twitterObj.twitter_id
      twitter.twitter_user_id     = twitterObj.twitter_user_id
      twitter.username            = twitterObj.username
      twitter.access_token        = twitterObj.access_token
      twitter.is_linked           = twitterObj.is_linked

      twitter.save(function (error) {
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
    Twitter.remove({
      _id: id
    }, function (error, twitter) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addTwitter,
  fetchOne,
  updateOne,
  removeOne
}
