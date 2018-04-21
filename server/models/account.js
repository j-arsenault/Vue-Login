const dbfactory = require('./database.js');

//use this for auto incrementing the account_id
//TODO: move this to another file and call when inserting new accounts
db.createCollection("counters");
db.counter.insert({_id:"tid",sequence_value:0});

function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
    query:{_id: sequenceName },
    update: {$inc:{sequence_value:1}},
    new:true
      });
  return sequenceDocument.sequence_value;
};

const schema = {
  account_id: {
    type: Number,
    required: [true, 'account_id is required']
  },
  account_type: {
    type: String,
    required: [true, 'account_type must be specified']
  },
  user_id: {
    type: Number,
    required: [true, 'user_id must be connected to account']
  }
};

const Account = dbfactory("Account", schema);

function addAccount(account_id, account_type, user_id) {
  let new_account = new Account({
    account_id: account_id,
    account_type: account_type,
    user_id: user_id
  })
  return new Promise((resolve, reject) => {
    new_account.save(function (error, account) {
      if (error) {
        reject(error)
      }
      resolve({
        account: account,
        success: true,
        message: 'Successful account setup!'
      })
    })
  })
};

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Account.findById(id, Object.keys(schema).join(" "), function (error, account) {
      if (error) {
        reject(error)
      }
      resolve(account)
    })
  })
};

function updateOne(id, accountObj) {
  return new Promise((resolve, reject) => {
    Account.findById(id, Object.keys(schema).join(" "), function (error, account){
      if (error){
        reject(error)
      }
      account.account_id    = accountObj.account_id
      account.account_type  = accountObj.account_type
      account.user_id       = accountObj.user_id

      account.save(function (error) {
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
    Account.remove({
      _id: id
    }, function (error, account) {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports = {
  addAccount,
  fetchOne,
  updateOne,
  removeOne
}
