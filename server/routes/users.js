let Users = require("../models/users")
let path = '/api';

module.exports = (app) => {
  // Add new user
  app.post(`${path}/users`, (req, res) => {
    Users.addUser(req.body.firstName, req.body.firstName, req.body.email, req.body.password).then(
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


  // Fetch single user for testing
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
      (player) => {
        res.send(player)
      },
      (err) => {
        console.error(err)
      }
    )
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