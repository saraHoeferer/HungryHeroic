const express = require("express");
const cors = require("cors");

// Import the database connection
const db = require("./app/models");

const app = express();

app.use(
  cors({ // Enable CORS with specific allowed origins
    credentials: true,
    origin: ["http://localhost:4200", "http://192.168.0.239:4200"],
  })
); 

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Synchronize with the database
db.sequelize.sync()
  .then(() => {
    console.log("Synced db."); // Log successful synchronization
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message); // Log synchronization failure with the error message
  });

// Simple route for the root URL
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hungryheroic database application." }); // Return a JSON response with a welcome message
});

// Routes
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
