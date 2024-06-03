const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
let user = require ('./api/user/index.js')
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user)

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
