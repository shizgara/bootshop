const Sequelize = require("sequelize");
const sequelize = require("../helper/database");

/*define - означає що ми реєструємо якусь модель(таблицю) з назвою product і сворюємо поля,які будуть в таблиці */
const productTable = sequelize.define("productTable", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  sale: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  color: Sequelize.STRING,
  shortDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  released: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  dimensions: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  displaySize: {
    type: Sequelize.STRING,
  },
  features: {
    type: Sequelize.TEXT,
  },
});

module.exports = productTable;
