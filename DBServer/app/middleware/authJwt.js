const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// Middleware function to verify the access token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; // Get the access token from the request headers

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
// Verify the token using the secret key
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.user_id; // Store the user ID from the decoded token in the request object
              next();
            });
};

const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;