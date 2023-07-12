
const db = require("../models"); // Database connection
const config = require("../config/auth.config"); // Configuration file for authentication
const User = db.user; // User model from the database
const Op = db.Sequelize.Op; // Operator for database queries
var jwt = require("jsonwebtoken");// JSON Web Token for generating access tokens
var bcrypt = require("bcryptjs");// bcrypt for secure password hashing function

// Function for user registration
exports.signup = (req, res) => {
// Save the user to the database
  User.create({
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 8) // Hash and save the password from the request
  })
    .then(users => {
      res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Function for user login
exports.signin = (req, res) => {
  User.findOne({
    where: {
      user_name: req.body.user_name // Find the user in the database based on the username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
// Check if the entered password matches the password stored in the database
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
// Generate an access token with the user ID
      const token = jwt.sign({ user_id: user.user_id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
// Send the successful login response
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

// Function for password change
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
      // Set the new password and save the user in the database
      user.user_password = bcrypt.hashSync(req.body.user_new_password, 8)
      user.save()
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};