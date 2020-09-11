const Sequelize = require("sequelize");
const sequelize = require("../helper/database")


const product = sequelize.define("product",{
    id:{
        type: Sequelize.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey:true,
    },
    title: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    price:Sequelize.DOUBLE,
    imageURL: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    color: {
        type: Sequelize.STRING,
    },
    shortDescription:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fullDescription:{
        type: Sequelize.TEXT,
        allowNull:false,
    },
    brand:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    model:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    realesed:{
        type: Sequelize.DATE,
    },
    dimesions:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    displaySize:{
        type: Sequelize.STRING,
    },
    features:{
        type:Sequelize.STRING,
    }
})

module.exports = product;