"use strict";
require("core-js/stable");
require("regenerator-runtime/runtime");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const forms = require("./routes/forms");
const app = express();
require("./middleware/EventFormMailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./config/keys");

mongoose
  .connect(db.mongoURI, db.options)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/forms", forms);

//Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 4000;

const server = app.listen(port);

module.exports = server;