const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model.js');
const { validateUser } =require('./auth-helpers.js');

router.post('/register', (req, res) => {
  
  let user = req.body;
  
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;

    Auth.add(user)
      .then(saved => {
        res.status(201).json({registered: `Added ${user.username}`});
      })
      .catch(error => {
        res.status(500).json({error: 'User added with an error'});
      });
  } else {
    res.status(400).json({
      message: 'Invalid information about the user, see errors for details',
      errors: validateResult.errors
    });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        const token = getJwtToken(user.username);

        
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: `User ${username} not found, please enter valid credentials!` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



function getJwtToken(username) {
  const payload = {
    username
  }

  const secret = process.env.JWT_SECRET || 'supersecret';

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
