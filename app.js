const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const CronJob = require('cron').CronJob;
const Cron = require('./config/backup');

// create express app
const app = express();
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.listen(1000, () => {
  console.log("Server is listening on port 1000");
});

// const chokidar = require('chokidar');

// // Initialize watcher.
// const watcher = chokidar.watch('C:\\Bhavin\\Error.csv', {
//   ignored: /(^|[\/\\])\../, // ignore dotfiles
//   persistent: true
// });

// // Add event listeners.
// watcher.on('unlink', (path, stats) => {
//   console.log(stats);
//   if (stats)
//     console.log(`File ${path} changed size to ${stats.size}`);
// });

//watcher.on('unlink', path => log(`File ${path} has been removed`));


// AutoBackUp every day at 02:00 AM
new CronJob(
  '0 0 2 * * *',
  function () {
    Cron.dbAutoBackUp();
  },
  null,
  true,
  'America/New_York'
);

