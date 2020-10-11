/*Ініціалізації фреймворка express i плагіна body-parser(розпарсує дані з метода .post()), метода path  */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const errorController = require("./controller/errorController");
const session = require("express-session");

// Include Models
const User = require("./models/users");

const {Username, Password} = require("./helper/database");

/*Ініціалізація порта і обєкта(сервера) app */
const PORT = 8000;
const app = express(); 

// Routes middleware
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

/*Підключення шаблонізатора */
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));// для зчитування даних з body

// Підключення папки static де зберігаються шрифти,css і т.п. і для адмінки також
app.use(express.static(path.join(__dirname, "static")));
app.use(session({secret:"my super secret", resave: false, saveUninitialized:false}));
app.use("/admin", express.static(__dirname + "/static"));
app.use("/product_detail", express.static(path.join(__dirname, "static")));
app.use(["/admin/edit_product", "/admin/admin_products_detail"],express.static(path.join(__dirname, "static")));

/*Присвоюємо змінній req.user дані про юзера під id №1*/
app.use((req, res, next) => {
  User.findById('5f7ca7b149911536fcdcecd0')
    .then((user) => {
      // console.log("user==>>>>",user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//Routes
app.use(mainRoutes);
app.use(authRoutes);
app.use("/admin", adminRoutes);
/*Middleware for 404 Page not found */
app.use(errorController.get404);

/*Тут прописане підключення до бази через mongoose */
mongoose
  .connect(
    `mongodb+srv://shizgara:shizgara123@cluster0.cvhh2.mongodb.net/Bootshop?retryWrites=true&w=majority`,//Тут вводять пароль,пасворд і назва бд
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "master",
          email: "master@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();//Метод save() відправляє дані на Атлас
      }
    });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });