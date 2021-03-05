// ℹ️ Gets access to environment variables/settings
const cors = require('cors');
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

app.use(
  cors({
    // this could be multiple domains/origins, but we will allow just our React app
    origin: ['http://localhost:3000']
  })
);

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const auth = require('./routes/auth/auth');
app.use("/api/auth", auth);

const gallery = require('./routes/gallery/gallery');
app.use("/api/gallery", gallery);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
