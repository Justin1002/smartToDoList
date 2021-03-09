/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { categoryDecision } = require('../category-decision')

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

    getCity(userID, db)
      .then(
        res =>{ console.log(res)
         return categoryDecision(description, res.location)
        }
      )
      .then(
        res => { console.log(res)
          return insertUserTask(userID, description, res, db)
        }
      )
      .then (
        task => {
          console.log(task)
          res.send(task);
        }
      )
      .catch (e => {
        console.error(e);
        res.send(e)
      })

  })

  router.put("/:taskID", (req,res) => {
    const userID = req.session.user_id
    if (!userID) {
      res.status(401).send("Not logged in");
      return
    }

    const category = req.body.category;
    const description = req.body.text_description;
    const taskID = req.params.taskID;

    updateTask(userID,category,description,taskID, db)
      .then( task => {
        console.log(task)
        res.send(task)})
      .catch(e => {
        console.error(e);
        res.send(e)
      })
  })

  //completed PUT
  router.put("/:taskID", (req,res) => {
    const userID = req.session.user_id
    if (!userID) {
      res.status(401).send("Not logged in");
      return
    }
    const completed = req.body.completed;
    console.log(completed);
    if(completed){
      //QUERY TO SET TO FALSE
    } else {
      //QUERY SET TO TRUE;
    }
  });

  router.delete("/:taskID", (req,res) => {
    const userID = req.session.user_id
    if (!userID) {
      res.status(401).send("Not logged in");
      return
    }

    const taskID = req.params.taskID;

    deleteTask(userID, taskID, db)
      .then( task => {
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
  WHERE tasks.user_id = $1
  ORDER BY tasks.creation_date ASC`
  const value = [userid]
  return db.query(query, value)
    .then(res => res.rows)
    .catch(err => {
       console.error('query error', err.stack);
    });
}

const insertUserTask = function(userid, description, category, db) {
  let date = new Date()

  let query = `INSERT INTO tasks (user_id, category, description, creation_date)
  VALUES ($1,$2,$3,$4)
  RETURNING *;`

  const values = [userid, category, description, date]

  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
   });
}

const updateTask = function(userid, category, description, taskID, db) {

  let query = `UPDATE tasks SET category = $1`
  // description = $2
  // WHERE user_id = $3 AND id = $4
  // RETURNING *;`
  const queryParams = [category];
  if (description) {
    queryParams.push(description)
    query += `, description = $${queryParams.length}`
  }
    queryParams.push(userid)
    query += ` WHERE user_id = $${queryParams.length}`

    queryParams.push(taskID)
    query += ` AND id = $${queryParams.length} RETURNING *;`

  return db.query(query, queryParams)
    .then (
      res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    })
}

const deleteTask = function(userID, taskID, db) {
  let query = `DELETE FROM tasks
  WHERE user_id = $1 AND id = $2`

  const values = [userID, taskID]
  return db.query(query,values)
    .then (
      res => res.rows[0]
    )
    .catch(err => {
      console.error('query error', err.stack);
    })
}

const getCity = function(userID, db) {
  let query = `SELECT location FROM users
  WHERE users.id = $1`
  let values = [userID]
  return db.query(query,values)
    .then (
      res => res.rows[0]
    )
    .catch(err => {
      console.error('query error', err.stack);
    })
}
