// підключили метод express і express.router()
const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");

router.get("/", mainController.getHomePage);


module.exports = router;
