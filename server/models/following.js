const dbfactory = require('./database.js');

const schema = {
  following_id: {
    type: Number,
    required: [true, 'following_id is required']
  },
  user_id: {
    type: Number,
    required: [true, 'user_id must be connected to account']
  }
};

const Following = dbfactory("Following", schema);

function addFollowing(following_id, user_id) {
  let new_account =   new Following({
    following_id:     following_id,
    user_id:          user_id
  })
  return new Promise((resolve, reject) => {
    new_following.save(function (error, following) {
      if (error) {
        reject(error)
      }
      resolve({
        following:    following,
        success:      true,
        message:      'Successful following setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Following.findById(id, Object.keys(schema).join(" "), function (error, following) {
      if (error) {
        reject(error)
      }
      resolve(following)
    })
  })
};

function updateOne(id, followingObj) {
  return new Promise((resolve, reject) => {
    Following.findById(id, Object.keys(schema).join(" "), function (error, account){
      if (error){
        reject(error)
      }
      following.following_id    = followingObj.following_id
      following.user_id         = followingObj.user_id

      following.save(function (error) {
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
    Following.remove({
      _id: id
    }, function (error, following) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addFollowing,
  fetchOne,
  updateOne,
  removeOne
}
