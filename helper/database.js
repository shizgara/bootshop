const Sequalize = require("sequelize");

// const {DATABASENAME, PASSWORD, USERNAME, HOSTNAME} = require("./config")

const DBHOST = process.env.DBHOST;
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;
const DATABASENAME = process.env.DATABASENAME;

// console.log("DataBase Host ==>>",DBHOST);
// console.log("DataBase Username ==>>",DBUSERNAME);
// console.log("DataBase Password ==>>",DBPASSWORD);
// console.log("DataBase Name ==>>",DATABASENAME);

const sequalize = new Sequalize(DATABASENAME, DBPASSWORD, DBUSERNAME, {
  dialect: "mysql",
  // host: "localhost",//from localhost
  // host: 10.7.101.193, // internal address
  host: DBHOST, //external address
});

module.exports = sequalize;
