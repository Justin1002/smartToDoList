const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.redirect('/')
  })

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/')
  })

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    login(email,password,db)
      .then(user => {
        if(!user) {
          console.log('is this here');
          res.status(401)
          return res.send('test');
        }
        req.session.user_id = user.id;
        res.send({name: user.name, email: user.email, id: user.id})
      })
      .catch(e => res.send(e));
    })

  return router;
}

const login = function(email,password,db) {
  const query = `SELECT * FROM users WHERE email = $1`
  const value = [email || 'null']
  console.log(query)
  console.log(value)
  return db.query(query,value)
    .then (res => {
      console.log(res.rows[0])
      return res.rows[0]})
    .then (res => {
      console.log(res)
      if (res !== undefined && bcrypt.compareSync(password, res.password)) {
        return res
      }
      console.log('fail')
      return null;
    })
    .catch(err => res.send(err));
}


