const sequelize = require("sequelize");

const user = require('../models/users');

const createUsers = 
    user.create(
        {
          name: "master",
          email: "master@example.com",
          password: "masterpass",
        },
      );

      module.exports = createUsers;