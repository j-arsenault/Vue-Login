let Users = require("../models/users")
let path = '/api';

module.exports = (app) => {
  // Add new user
  app.post(`${path}/users`, (req, res) => {
    Users.addUser(req.body).then(
      (message) => {
        res.send(message)
      },
      (err) => {
        res.send(err)
      }
    ).catch(function (error) {
      return error
    })
  })


  // Fetch single user for testing API/Server works
  app.get(`${path}/users`, (req, res) => {
    res.send(
      [{
        firstName: "Ian",
        lastName: "Arsenault",
        dateCreated: new Date()
      }]
    )
  })

  // Fetch single user
  app.get(`${path}/users/:id`, (req, res) => {
    Users.fetchOne(req.params.id).then(
      (user) => {
        res.send(user)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Login user
  app.post(`${path}/login`, (req, res) => {
    Users.loginUser(req.body).then(
      (user) => {
        req.session.userId = user._id
        console.log("user id = " + user._id)
        console.log('CURRENT SESSION.....')

        console.log("User Id", req.session.userId)
        console.log("Sesson Data....\n", req.session)

        res.send(user)
      },
      (err) => {
        // res.send(err
        console.error(err)
      }
    )
  })

  // test session
  app.get(`${path}/session`, (req, res) => {
    let sessionUserId = req.session
    res.send(`Print out session details: ${JSON.stringify(sessionUserId)}`);
  })

  // Update a user
  app.put(`${path}/users/:id`, (req, res) => {
    Users.updateOne(req.params.id, req.body).then(
      (success) => {
        res.send({success: true})
      },
      (err) => {
        res.send(err)
      }
    ).catch(function (error) {
      return error
    })
  })

  // Delete a user
  app.delete(`${path}/users/:id`, (req, res) => {
    Users.removeOne(req.params.id).then(
      (success) => {
        res.send({success: true})
      },
      (err) => {
        console.error(err)
      }
    )
  })


}