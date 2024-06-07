const Sequlize = require("sequelize");

const sequelize = new Sequlize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false
});

const User = sequelize.define("User", {
  name: {
      type: Sequlize.STRING,
      unique: true,
  }
});

module.exports = { Sequlize, sequelize, User };
