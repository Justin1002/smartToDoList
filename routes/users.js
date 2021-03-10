/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const dbParams = require('../lib/db');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session.user_id

    if(userID) {

    db.query(`SELECT * FROM users WHERE id = $1;`,[userID])
      .then(data => {
        console.log(data)
        const users = data.rows[0];
        res.send({id: users.id, name: users.name, email: users.email, location: users.location});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
    else {
      res.send({})
    }
  });

  //registration route
  router.post("/", (req, res) => {
    const userID = req.session.user_id
    console.log(userID)
    if (!userID) {
      const user = req.body
      user.password = bcrypt.hashSync(user.password, 12);
      addUser(user, db)
        .then(user => {
          req.session.user_id = user.id
          console.log(user)
          res.send(user)
        })
        .catch(err => res.send(err))
    }
    else {
      res.redirect('/')
    }
  })

  //Update user route
  router.put("/", (req,res) => {
    const userID = req.session.user_id
    if (!userID) {
      return res.status(401).send('Not logged in')
    }
    const obj = req.body
    if (obj.password) {
    obj.password = bcrypt.hashSync(obj.password, 12);
    }
    updateUser(obj,userID, db)
      .then(user => {
        res.send(user)
      })
      .catch(err => res.send(err))
  })

  return router;
};

//Function calls

const addUser = function(user, db) {
  let query = `INSERT into users (name, email, password, location)
  VALUES($1,$2,$3,$4)
  RETURNING *`
  const values = [user.name, user.email, user.password, user.location]
  return db.query(query,values)
    .then (res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}

const updateUser = function(obj,userID, db) {
  let query = `UPDATE users SET`
  // name = $1, email = $2, password = $3, location = $4
  // WHERE id = $5`
  const queryParams = [];
  if (obj.name) {
    queryParams.push(obj.name)
    query += ` name = $${queryParams.length}`
  }

  if (obj.email) {
    if (queryParams.length > 0) {
      queryParams.push(obj.email)
      query += `, email = $${queryParams.length}`
    }
    else {
      queryParams.push(obj.email)
      query += ` email = $${queryParams.length}`
    }
  }

  if (obj.password) {
    if (queryParams.length > 0) {
      queryParams.push(obj.password)
      query += `, password = $${queryParams.length}`
    }
    else {
      queryParams.push(obj.email)
      query += ` password = $${queryParams.length}`
    }
  }

  if (obj.location) {
    if (queryParams.length > 0) {
      queryParams.push(obj.email)
      query += `, location = $${queryParams.length}`
    }
    else {
      queryParams.push(obj.email)
      query += ` location = $${queryParams.length}`
    }
  }

  queryParams.push(userID)
  query += ` WHERE id = $${queryParams.length}`

  console.log(query)
  console.log(queryParams)
  return db.query(query,queryParams)
    .then (res => {
      console.log(res)
      return res.rows[0]})
    .catch(err => console.error('query error', err.stack));
}
