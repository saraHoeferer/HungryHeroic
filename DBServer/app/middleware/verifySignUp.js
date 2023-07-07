const db = require("../models");
const Roles = db.roles;
const Users = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Users.findOne({
    where: {
      user_name: req.body.user_name
    }
  }).then(users => {
    if (users) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    Users.findOne({
      where: {
        user_mail: req.body.user_mail
      }
    }).then(users => {
      if (users) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Roles.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;