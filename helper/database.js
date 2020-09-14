const Sequalize = require("sequelize");

const {DATABASENAME, PASSWORD, USERNAME, HOSTNAME} = require("./config")

const sequalize = new Sequalize(DATABASENAME,PASSWORD,USERNAME, {
  dialect: "mysql",
  // host: "localhost",//from localhost
  // host: 10.7.101.193, // internal address
  host: HOSTNAME, //external address
});

module.exports = sequalize;
