'use strict';

// API boilerplate
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

// Setup the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
  .catch((err) => {
    // Shut down the API if a database connection cannot be established
    console.error(err);
    process.exit(1);
  });

// Configure the routes
app.use('/', routes);

// Start the API
const port = 5000;
app.listen(port);
console.log(`example api running on port ${port}`);
