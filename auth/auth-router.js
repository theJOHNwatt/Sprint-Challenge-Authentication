const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model.js');
const { validateUser } =require('./auth-helpers.js');

router.post("/register", (req, res) => {
  let user = req.body;
  
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;

    Auth.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({error: 'User added with an error'});
      });
  } else {
    res.status(400).json({
      message: "Invalid information about the user, see errors for details",
      errors: validateResult.errors
    });
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
