const dbfactory = require('./database.js');

const schema = {
  twitch_id: {
    type: Number,
    required: [true, 'twitch_id is required']
  },
  TCHuser_id: {
    type: Number,
    required: [true, 'TCHuser_id is required']
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

const Twitch = dbfactory("Twitch", schema);

function addTwitch(twitch_id, TCHuser_id, username, access_token, is_linked) {
  let new_twitch = new Twitch({
    twitch_id:      twitch_id,
    TCHuser_id:     TCHuser_id,
    username:       username
    access_token:   access_token
    is_linked:      is_linked
  })
  return new Promise((resolve, reject) => {
    new_twitch.save(function (error, twitch) {
      if (error) {
        reject(error)
      }
      resolve({
        twitch: twitch,
        success: true,
        message: 'Successful twitch connected account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Twitch.findById(id, Object.keys(schema).join(" "), function (error, twitch) {
      if (error) {
        reject(error)
      }
      resolve(twitch)
    })
  })
};

function updateOne(id, twitchObj) {
  return new Promise((resolve, reject) => {
    Twitch.findById(id, Object.keys(schema).join(" "), function (error, twitch){
      if (error){
        reject(error)
      }
      twitch.twitch_id      = twitchObj.twitch_id
      twitch.TCHuser_id     = twitchObj.TCHuser_id
      twitch.username       = twitchObj.username
      twitch.access_token   = twitchObj.access_token
      twitch.is_linked      = twitchObj.is_linked

      twitch.save(function (error) {
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
    Twitch.remove({
      _id: id
    }, function (error, twitch) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addTwitch,
  fetchOne,
  updateOne,
  removeOne
}
