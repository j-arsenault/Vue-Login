const dbfactory = require('./database.js');

const schema = {
  following_list_id: {
    type: Number,
    required: [true, 'following_list_id is required']
  },
  following_id: {
    type: String,
    required: [true, 'following_id must be specified']
  },
  user_id: {
    type: Number,
    required: [true, 'user_id must be connected to account']
  }
};

const FollowingList = dbfactory("FollowingList", schema);

function addFollowingList(following_list_id, following_id, user_id) {
  let new_followingList =   new FollowingList({
    following_list_id:      following_list_id,
    following_id:           following_id,
    user_id:                user_id
  })
  return new Promise((resolve, reject) => {
    new_followingList.save(function (error, followingList) {
      if (error) {
        reject(error)
      }
      resolve({
        followingList:  followingList,
        success:        true,
        message:        'Successful account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    FollowingList.findById(id, Object.keys(schema).join(" "), function (error, followingList) {
      if (error) {
        reject(error)
      }
      resolve(account)
    })
  })
};

function updateOne(id, followingListObj) {
  return new Promise((resolve, reject) => {
    FollowingList.findById(id, Object.keys(schema).join(" "), function (error, followingList){
      if (error){
        reject(error)
      }
      followingList.following_list_id    = followingListObj.following_list_id
      followingList.following_id         = followingListObj.following_id
      followingList.user_id              = followingListObj.user_id

      FollowingList.save(function (error) {
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
    FollowingList.remove({
      _id: id
    }, function (error, followingList) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addFollowingList,
  fetchOne,
  updateOne,
  removeOne
}
