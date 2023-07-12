const authJwt = require("./authJwt"); // Import the authJwt middleware 
const verifySignUp = require("./verifySignUp");// Import the verifySignUp middleware 

// Export the middleware modules as an object
module.exports = {
  authJwt,
  verifySignUp
};
