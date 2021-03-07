/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userID = req.session.user_id
    if (!userID) {
      res.status(401).send("Bad login");
      return
    }
    getUserTasks(userID, db)
      .then(tasks => res.send(tasks))
      .catch(e => {
        console.log(e);
        res.send(e)
      })

  });

  router.post("/", (req,res) => {
    const userID = req.session.user_id

    if (!userID) {
      res.status(401).send("Not logged in");
      return
    }
    const description = req.body.text_description

    insertUserTask(userID, description, db)
      .then(task => {
        console.log(task)
        res.send(task)
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      })
  })
  return router;
};

// Function calls

const getUserTasks = function(userid,db) {
  let query = `SELECT *
  FROM tasks
  WHERE tasks.user_id = $1`
  const value = [userid]
  return db.query(query, value)
    .then(res => res.rows)
    .catch(err => {
       console.error('query error', err.stack);
    });
}

const insertUserTask = function(userid, description, db) {
  let date = new Date()

  let query = `INSERT INTO tasks (user_id, category, description, creation_date)
  VALUES ($1,$2,$3,$4)
  RETURNING *`

  const values = [userid, 'catFunction', description, date]

  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
   });
}
