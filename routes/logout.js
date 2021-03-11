/*
 * All routes for logout are defined here
 * Since this file is loaded in server.js into api/logout,
 *   these routes are mounted onto /logout
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// Logout user by clearing cookies and redirecting to login page
module.exports = () => {
  router.get('/', (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect('/');
  });
  return router;
};