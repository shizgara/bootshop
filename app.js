/*Ініціалізації фреймворка express i плагіна body-parser(розпарсує дані з метода .post()), метода path  */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/*Ініціалізація порта і обєкта(сервера) app */
const PORT = 8000;
const app = express();


// Middleware
/*Підключення шаблонізатора */
app.set("view engine", "ejs");
app.set("views", "views");/*тут треба пояснення */
app.use(bodyParser.urlencoded({ extended: false })); /*тут треба пояснення */

// Підключення папки static де зберігаються шрифти,css і т.п.
app.use(express.static(path.join(__dirname, "static")));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));