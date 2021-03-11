/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { categoryDecision } = require('../category-decision');

const {
  getUserTasks,
  insertUserTask,
  updateTask,
  deleteTask,
  getCity} = require('./helperFunctions');

module.exports = (db) => {
  // Get all of the users tasks
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
      res.status(401).send("Not logged in");
      return;
    }
    getUserTasks(userID, db)
      .then(tasks => res.send(tasks))
      .catch(e => {
        res.send(e);
      });
  });

  // Create new task route (through modal)
  // Determines what category the task should be in and then adds it to the database
  router.post("/", (req,res) => {
    const userID = req.session.user_id;
    const description = req.body.text_description;
    getCity(userID, db)
      .then(res => categoryDecision(description, res.location))
      .then(res => insertUserTask(userID, description, res, db))
      .then(task => {
        res.send(task);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Update task route (through modal)
  router.put("/:taskID", (req,res) => {
    const userID = req.session.user_id;
    const category = req.body.category;
    const description = req.body.text_description;
    const taskID = req.params.taskID;
    const completion = req.body.completed;

    updateTask(userID ,category, description, completion, taskID, db)
      .then(task => {
        res.send(task);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Delete task route (when user clicks garbage can icon)
  router.delete("/:taskID", (req,res) => {
    const userID = req.session.user_id;
    const taskID = req.params.taskID;
    deleteTask(userID, taskID, db)
      .then(task => {
        res.send(task);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};