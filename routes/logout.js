const express = require('express')
const router = express.Router()

module.exports = () => {
  router.get('/', (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect('/')
  })

  return router;
}
