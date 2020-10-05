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

// Include Models
const Product = require("./models/product");
const User = require("./models/users");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

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
app.use(
  ["/admin/edit_product", "/admin/admin_products_detail"],
  express.static(path.join(__dirname, "static"))
);

/*Присвоюємо змінній req.user дані про юзера під id №1*/
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // console.log("user========================================>>>>",user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//Routes
app.use(mainRoutes);
app.use("/admin", adminRoutes);
/*Middleware for 404 Page not found */
app.use(errorController.get404);

// Relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequalize
  // sync синхронізує модель з базою
  .sync({force:true})
  .then((connectionRezult) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      const createUsers = require("./models/create_users");
      return createUsers;
    } else {
      return user;
    }
  })
  .then((user) => {
    return user.createCart();
  })
  .then((data) => {
    return Product.findByPk(1);
  })
  .then((product) => {
    if (!product) {
      const seedProducts = require("./models/seedProducts");
      return seedProducts.createProduct() ;
    } else {
      return product;
    }
  })
  .then((cart) => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("catch eroro=========>>>>>>>", err));
