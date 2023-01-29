const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
          message: "Email already exists!"
      });
    });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.find({ email: req.body.email }).then(async user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed: Incorrect credentials'
      });
    }
    fetchedUser = user[0];
    return await bcrypt.compare(req.body.password, user[0]?.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed: Incorrect credentials'
      });
    }
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});
    res.status(200).json({
      token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed: Incorrect credentials'
    });
  });
};
