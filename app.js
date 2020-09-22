/*Ініціалізації фреймворка express i плагіна body-parser(розпарсує дані з метода .post()), метода path  */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/*Ініціалізація порта і обєкта(сервера) app */
const PORT = 8000;
const app = express();

// Controllers
const errorController = require("./controller/errorController");
// const adminController = require("./controller/adminContreller");

//Include sequalize
const sequalize = require("./helper/database");
/*----------тут при старті створилась таблиця users, а як сворюється таблиця product? Ми ж її тут не ініціалізовуємо  */
//Include models
// Include Models
const Product = require("./models/product");
const User = require("./models/users");
const Cart = require("./models/cart");
const CarItem = require("./models/cartItem");

const createUsers = require("./models/create_users");
const productCreate = require("./models/create_product");

// Routes middleware
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");

/*Підключення шаблонізатора */
app.set("view engine", "ejs");
app.set("views", "views"); 
app.use(bodyParser.urlencoded({ extended: false })); 

// Підключення папки static де зберігаються шрифти,css і т.п. і для адмінки також
app.use(express.static(path.join(__dirname, "static")));
app.use("/admin", express.static(__dirname + "/static"));
app.use("/product_detail", express.static(path.join(__dirname, "static")));
app.use(["/admin/edit_product","/admin/admin_products_detail"], express.static(path.join(__dirname, "static")));


app.use(mainRoutes);
app.use("/admin", adminRoutes);
/*Middleware for 404 Page not found */
app.use(errorController.get404);

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


// Relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CarItem });
Product.belongsToMany(Cart, { through: CarItem });

sequalize
  // sync синхронізує модель з базою
  .sync()
  .then((connectionRezult) => {
    return User.findByPk(1);
  })
  .then((user) => {
    console.log("user => ", user);
    if (!user) {
      return createUsers;
    }
    return user;
  })
  // .then((user) => {
  //   return Product.findByPk(1);
  // })
  // .then((product) => {
  //   console.log("product id ======================> ", product);
  //   if (!product) {
  //     return productCreate;
  //   }
  //   return product;
  // })
  .then((user) => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
