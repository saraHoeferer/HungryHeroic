const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Role = db.roles;
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
// database
const db = require("./app/models");

db.sequelize.sync({force: true})
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

// routes
require("./app/routes/item.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/user.routes")(app);
require('./app/routes/auth.routes')(app);
require("./app/routes/inventorylist.routes")(app);
require("./app/routes/shoppinglist.routes")(app);
require("./app/routes/storagelocation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}