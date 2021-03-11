const bcrypt = require('bcrypt');

// Inserts new user into database
const addUser = function(user, db) {
  let query = `
		INSERT into users (name, email, password, location)
  	VALUES ($1, $2, $3, $4)
		RETURNING *`;
  const values = [user.name, user.email, user.password, user.location];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

// Updates existing user's profile information in database
const updateUser = function(obj, userID, db) {
  let query = `UPDATE users `;
  const queryParams = [];
  const propertiesToUpdate = ['name', 'email', 'password', 'location'];

  for (let property of propertiesToUpdate) {
    if (obj[property]) {
      queryParams.push(obj[property]);
      if (queryParams.length > 1) {
        query += `, ${property} = $${queryParams.length}`;
      } else {
        query += `SET ${property} = $${queryParams.length}`;
      }
    }
  }
  queryParams.push(userID);
  query += ` WHERE id = $${queryParams.length}`;

  return db.query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

// Get all tasks belonging to the current user
const getUserTasks = function(userid, db) {
  const query = `
		SELECT *
  	FROM tasks
  	WHERE tasks.user_id = $1
  	ORDER BY tasks.creation_date ASC`;
  const value = [userid];
  return db.query(query, value)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
};

// Add new task to database
const insertUserTask = function(userid, description, category, db) {
  const date = new Date();
  const query = `
		INSERT INTO tasks (user_id, category, description, creation_date)
  	VALUES ($1, $2, $3, $4)
  	RETURNING *;`;
  const values = [userid, category, description, date];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

// Update task's values in database
const updateTask = function(userid, category, description, completion, taskID, db) {
  let query = `UPDATE tasks SET`;
  const queryParams = [];

  if (category) {
    queryParams.push(category);
    query += ` category = $${queryParams.length}`;
  }
  if (description) {
    queryParams.push(description);
    query += `, description = $${queryParams.length}`;
  }
  if (completion) {
    let date = new Date();
    queryParams.push(completion);
    query += ` completed = $${queryParams.length},`;
    if (completion === 'true') {
      queryParams.push(date);
    } else {
      queryParams.push(null);
    }
    query += ` completion_date = $${queryParams.length}`;
  }

  queryParams.push(userid);
  query += ` WHERE user_id = $${queryParams.length}`;
  queryParams.push(taskID);
  query += ` AND id = $${queryParams.length} RETURNING *;`;

  return db.query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

// Delete specified task from database
const deleteTask = function(userID, taskID, db) {
  let query = `DELETE FROM tasks WHERE user_id = $1 AND id = $2`;
  const values = [userID, taskID];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

// Get current user's city
const getCity = function(userID, db) {
  let query = `SELECT location FROM users WHERE users.id = $1`;
  let values = [userID];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

// Log in user
const login = function(email, password, db) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const value = [email || 'null'];
  return db.query(query, value)
    .then(res => res.rows[0])
    .then(res => {
      if (res !== undefined && bcrypt.compareSync(password, res.password)) {
        return res;
      }
      return null;
    })
    .catch((err, res) => res.send(err));
};

module.exports = {
  addUser,
  updateUser,
  getUserTasks,
  insertUserTask,
  updateTask,
  deleteTask,
  getCity,
  login
};