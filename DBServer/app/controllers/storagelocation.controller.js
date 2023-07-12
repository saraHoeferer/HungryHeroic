const db = require("../models");
const StorageLocation = db.storageLocation;

// Retrieve all Storage Locations from the database.
exports.findAll = (req, res) => {
  StorageLocation.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};