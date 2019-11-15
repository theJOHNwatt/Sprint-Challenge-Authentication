const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
