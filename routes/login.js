const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log(req.session)
    req.session.user_id = 1;
    res.redirect('/')
  })

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/')
  })

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email,password,db)
      .then(user => {
        if(!user) {
          res.status(401).send("Wrong password or email");
          return
        }
        req.session.user_id = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}})
      })
      .catch(e => res.send(e));
    })

  return router;
}

const login = function(email,password,db) {
  const query = `SELECT * FROM users WHERE email = $1`
  const value = [email || 'null']
  return db.query(query,value)
    .then (res => res.rows[0])
    .then (res => {
      if (bcrypt.compareSync(password, res.password)) {
        return res
      }
      return null;
    })
    .catch(err => console.error('query error',err.stack));
}


