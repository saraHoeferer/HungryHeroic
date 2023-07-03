const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.item_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create Item
  const item = {
    item_id: req.body.item_id,
    item_name: req.body.item_name,
    item_quantity: req.body.item_quantity,
    item_expiration_date: req.body.item_expiration_date,
    item_category_id: req.body.item_category_id,
    item_storage_loc_id: req.body.item_storage_loc_id,
    progress: req.body.progress,
    progressString: req.body.progressString
  };

  // Save Tutorial in the database
  Items.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Items.findAll({ where: condition })
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
