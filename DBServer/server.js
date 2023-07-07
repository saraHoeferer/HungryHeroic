const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://192.168.0.239:4200", "http://localhost:4200"]
};

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/item.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/inventorylist.routes")(app);
require("./app/routes/shoppinglist.routes")(app);
require("./app/routes/storagelocation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});