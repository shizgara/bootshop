/*Ініціалізації фреймворка express i плагіна body-parser(розпарсує дані з метода .post()), метода path  */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const errorController = require("./controller/errorController");
const session = require("express-session");//Підключення модуля для роботи з сесіями
const mongoDBStroe = require("connect-mongodb-session")(session);//Підключення модуля для зберігання сесій в MongoDB

// Include Models
const User = require("./models/users");

const {DBUSERNAME, DBPASSWORD} = require("./helper/database");//Переназначили змінні з файла database

/*Ініціалізація порта і обєкта(сервера) app */
const PORT = 8000;
const app = express(); 

//MongoDB connection string
const MONGO_URL = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster0.cvhh2.mongodb.net/Bootshop?retryWrites=true&w=majority`;

//Create MongoDB Store. Створили можливість зберігати сесії вказавши адрес БД і назву колекції, в якій будуть зберігатись сесії
const store = new mongoDBStroe({
  uri:MONGO_URL,
  collection: "sessions",
})

// Routes middleware
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
// const { Session } = require("inspector");

/*Підключення шаблонізатора */
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));// для зчитування даних з body

// Підключення папки static де зберігаються шрифти,css і т.п. і для адмінки також
app.use(express.static(path.join(__dirname, "static")));

//Використовуємо middleware session(створення сесії)
app.use(session({
  secret:"my super secret", // ключ для шифрування
  resave: false, 
  saveUninitialized:false,//Змушує зберегти сеанс, який не ініціалізовано. Статус false. Економить місце  не сервері
  store:store,
  cookie:{maxAge:false},// час тривалості сесії
})
);
app.use("/admin", express.static(__dirname + "/static"));
app.use("/product_detail", express.static(path.join(__dirname, "static")));
app.use(["/admin/edit_product", "/admin/admin_products_detail"],express.static(path.join(__dirname, "static")));

/*Присвоюємо змінній req.user дані про юзера під id №1*/
app.use((req, res, next) => {
  if(!req.session.user){//Перевірка чи присутня дана зміна(req.session.user), тобто чи юзер залогінений
    // console.log("req.session.user====>>>",req.session.user)
    return next();
  }
  // console.log('req.session===>',req.session)
  User.findById(req.session.user._id)//знаходимо юзера по id з БД і присвоюємо його значення змінній req.user
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
    MONGO_URL,//Тут вводять пароль,пасворд і назва бд
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