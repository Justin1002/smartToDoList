const express = require('express')
const router = express.Router()

module.exports = () => {
  router.get('/', (req, res) => {
    console.log(req.session)
    req.session.user_id = 1;
    res.redirect('/')
  })

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/')
  })

  return router;
}
