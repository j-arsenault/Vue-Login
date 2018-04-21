const dbfactory = require('./database.js');

const schema = {
  follower_id: {
    type: Number,
    required: [true, 'follower_id is required']
  },
  user_id: {
    type: Number,
    required: [true, 'user_id must be connected to account']
  }
};

const Follower = dbfactory("Follower", schema);

function addFollower(follower_id, user_id) {
  let new_account = new Follower({
    follower_id:    follower_id,
    user_id:        user_id
  })
  return new Promise((resolve, reject) => {
    new_follower.save(function (error, follower) {
      if (error) {
        reject(error)
      }
      resolve({
        follower:   follower,
        success:    true,
        message:    'Successful follower setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Follower.findById(id, Object.keys(schema).join(" "), function (error, follower) {
      if (error) {
        reject(error)
      }
      resolve(follower)
    })
  })
};

function updateOne(id, followerObj) {
  return new Promise((resolve, reject) => {
    Follower.findById(id, Object.keys(schema).join(" "), function (error, account){
      if (error){
        reject(error)
      }
      follower.follower_id    = followerObj.follower_id
      follower.user_id        = followerObj.user_id

      follower.save(function (error) {
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
    Follower.remove({
      _id: id
    }, function (error, follower) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addFollower,
  fetchOne,
  updateOne,
  removeOne
}
