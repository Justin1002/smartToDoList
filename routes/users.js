/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { addUser, updateUser } = require('./helperFunctions');

module.exports = (db) => {
  // Get current users information
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    if (userID) {
      db.query(`SELECT * FROM users WHERE id = $1;`, [userID])
        .then(data => {
          const users = data.rows[0];
          res.send({id: users.id, name: users.name, email: users.email, location: users.location});
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.send({});
    }
  });

  // Registration route (by clicking register button in header when not logged in)
  router.post("/", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    addUser(user, db)
      .then(user => {
        req.session.user_id = user.id;
        res.send(user);
      })
      .catch(err => res.send(err));
  });

  // Update user route (by clicking user's name in header when logged in)
  router.put("/", (req,res) => {
    const userID = req.session.user_id;
    const obj = req.body;
    if (obj.password) {
      obj.password = bcrypt.hashSync(obj.password, 12);
    }
    updateUser(obj, userID, db)
      .then(user => {
        res.send(user);
      })
      .catch(err => res.send(err));
  });

  return router;
};