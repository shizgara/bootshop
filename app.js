/*Ініціалізації фреймворка express i плагіна body-parser(розпарсує дані з метода .post()), метода path  */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/*Ініціалізація порта і обєкта(сервера) app */
const PORT = 8000;
const app = express();

// Controllers
const errorController = require("./controller/errorController");
const adminController = require("./controller/adminContreller");

//Include sequalize
const sequalize = require("./helper/database");

// Routes middleware
const mainRoutes = require("./routes/mainRoutes");

app.use(mainRoutes);

/*Підключення шаблонізатора */
app.set("view engine", "ejs");
app.set("views", "views"); /*тут треба пояснення */
app.use(bodyParser.urlencoded({ extended: false })); /*тут треба пояснення */

// Підключення папки static де зберігаються шрифти,css і т.п.
app.use(express.static(path.join(__dirname, "static")));

/*Middleware for 404 Page not found */
app.use(errorController.get404);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// sequalize
//   .sync()
//   .then((connectionResult) => {
//     // console.log("connectionResult ==>>",connectionResult);
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));
