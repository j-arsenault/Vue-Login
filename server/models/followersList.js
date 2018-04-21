const dbfactory = require('./database.js');

const schema = {
  followers_list_id: {
    type: Number,
    required: [true, 'followers_list_id is required']
  },
  follower_id: {
    type: String,
    required: [true, 'follower_id must be specified']
  },
  user_id: {
    type: Number,
    required: [true, 'user_id must be connected to account']
  }
};

const FollowerList = dbfactory("FollowerList", schema);

function addFollowerList(followers_list_id, follower_id, user_id) {
  let new_followerList =  new FollowerList({
    followers_list_id:    followers_list_id,
    follower_id:          follower_id,
    user_id:              user_id
  })
  return new Promise((resolve, reject) => {
    new_followerList.save(function (error, followerList) {
      if (error) {
        reject(error)
      }
      resolve({
        followerList: followerList,
        success: true,
        message: 'Successful account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    FollowerList.findById(id, Object.keys(schema).join(" "), function (error, followerList) {
      if (error) {
        reject(error)
      }
      resolve(account)
    })
  })
};

function updateOne(id, followerListObj) {
  return new Promise((resolve, reject) => {
    FollowerList.findById(id, Object.keys(schema).join(" "), function (error, followerList){
      if (error){
        reject(error)
      }
      followerList.followers_list_id    = followerListObj.followers_list_id
      followerList.follower_id          = followerListObj.follower_id
      followerList.user_id              = followerListObj.user_id

      FollowerList.save(function (error) {
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
    FollowerList.remove({
      _id: id
    }, function (error, followerList) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addFollowerList,
  fetchOne,
  updateOne,
  removeOne
}
