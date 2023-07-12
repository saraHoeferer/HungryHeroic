const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 8)
  })
    .then(users => {
      res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      user_name: req.body.user_name
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.user_password,
        user.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ user_id: user.user_id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

        res.status(200).send({
          user_id: user.user_id,
          user_name: user.user_name,
          user_mail: user.user_mail,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.passwordChange = (req, res) => {
  User.findOne({
    where: {
      user_name: req.body.user_name
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log("hier")

      var passwordIsValid = bcrypt.compareSync(
        req.body.user_old_password,
        user.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Not correct old Password"
        });
      }
      user.user_password = bcrypt.hashSync(req.body.user_new_password, 8)
      user.save()
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};