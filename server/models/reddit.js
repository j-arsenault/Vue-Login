const dbfactory = require('./database.js');

const schema = {
  reddit_id: {
    type: Number,
    required: [true, 'reddit_id is required']
  },
  reddit_user_id: {
    type: Number,
    required: [true, 'reddit user id is required']
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

const Reddit = dbfactory("Reddit", schema);

function addreddit(reddit_id, TCHuser_id, username, access_token, is_linked) {
  let new_reddit =      new Reddit({
    reddit_id:          reddit_id,
    reddit_user_id:     reddit_user_id,
    username:           username
    access_token:       access_token
    is_linked:          is_linked
  })
  return new Promise((resolve, reject) => {
    new_reddit.save(function (error, reddit) {
      if (error) {
        reject(error)
      }
      resolve({
        reddit: reddit,
        success: true,
        message: 'Successful reddit connected account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Reddit.findById(id, Object.keys(schema).join(" "), function (error, reddit) {
      if (error) {
        reject(error)
      }
      resolve(reddit)
    })
  })
};

function updateOne(id, redditObj) {
  return new Promise((resolve, reject) => {
    Reddit.findById(id, Object.keys(schema).join(" "), function (error, reddit){
      if (error){
        reject(error)
      }
      reddit.reddit_id           = redditObj.reddit_id
      reddit.reddit_user_id      = redditObj.reddit_user_id
      reddit.username            = redditObj.username
      reddit.access_token        = redditObj.access_token
      reddit.is_linked           = redditObj.is_linked

      reddit.save(function (error) {
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
    Reddit.remove({
      _id: id
    }, function (error, reddit) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addreddit,
  fetchOne,
  updateOne,
  removeOne
}
