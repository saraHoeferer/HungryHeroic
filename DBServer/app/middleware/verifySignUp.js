const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check for duplicate username
  User.findOne({
    where: {
      user_name: req.body.user_name // Check if the username from the request already exists
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!" // Return an error response if the username is already taken
      });
      return;
    }

 // Check for duplicate email
    User.findOne({
      where: {
        user_mail: req.body.user_mail // Check if the email from the request already exists
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!" // Return an error response if the email is already taken
        });
        return;
      }
      next(); // If no duplicate username or email is found
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;