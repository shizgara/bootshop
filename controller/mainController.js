const Product = require("../models/product");
/*Піключили модель */
// const product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  Product
    .findAll()
    .then((dataproducts) => {
      res.render("pages/home", {
        products: dataproducts,
        pageTitle: "All products",
        path: "pages/home",
      });
    })
    .catch((err) => console.log(err));
};

exports.getContact = (req, res, next) => {
  res.render("pages/contact");
};

exports.getFaqPage = (req, res, next) => {
  res.render("pages/faq");
};

exports.getDeliveryPage = (req, res, next) => {
  res.render("pages/delivery");
};

exports.getSpecialOfferPage = (req, res, next) => {
  res.render("pages/special_offer");
};

exports.getCompairPage = (req, res, next) => {
  res.render("pages/compair");
};

exports.getComponentsPage = (req, res, next) => {
  res.render("pages/components");
};

exports.getForgetPassPage = (req, res, next) => {
  res.render("pages/forgetpass");
};

exports.getLegalNoticePage = (req, res, next) => {
  res.render("pages/legal_notice");
};

exports.getLoginPage = (req, res, next) => {
  res.render("pages/login");
};

exports.getProductDetailPage = (req, res, next) => {
  const productID = req.params.id;
  Product
    .findByPk(productID)
    .then((dataproducts) => {
      res.render("pages/product_detail", {
        products: dataproducts,
        // pageTitle: "All products",
        // path: "pages/product_detail",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  // console.log("req getCart => ", req.user);
  req.user
    .getCart() //В таблиці Cart створився запис з привязкою по userId №1. Тобто створилась корзина яка привязана до юзера id 1
    .then((cart) => {
      // console.log("catr==========>>>>>>>>",cart);
      return cart
        .getProducts() //Через створену таблицю cart з привязкою до даного юзера(id 1) робиться запит в таблицю products, щоб по привязкам визначити які продукти лежать в корзині даного користувача
        .then((products) => {
          // console.log('porudct in cart===>>>',products)
          res.render("pages/product_summary", {
            path: "/product_summary",
            products: products,
          });
        });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let newQuantity = 1;
  let currentCart;
  req.user
    .getCart()//Юзера привязали до його корзини 
    .then((cart) => {
      // console.log('postCart===>>>', cart)
      currentCart = cart;
      // console.log('currentCart====>>>', currentCart);
      return cart.getProducts({ where: { id: productId } });//Достає дані про продукт який лежить в таблиці cartItem по звязкам і id продукта
    })
    .then(([product]) => {
      // console.log('products===>>>',product)
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
    }
      return Product.findByPk(productId);
    })
    .then((product) => {
      console.log("postCart => product => ", product);
      return currentCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      req.user
          .getCart()
          .then((cart) => {
              res.redirect('/product_summary');
          })
          .catch((err) => console.log(err));
  })
    .catch((err) => console.log(err));
};

exports.getProductsPage = (req, res, next) => {
  Product
    .findAll()
    .then((dataproducts) => {
      res.render("pages/products", {
        products: dataproducts,
        pageTitle: "All products",
        path: "pages/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getRegisterPage = (req, res, next) => {
  res.render("pages/register");
};

exports.getTACPage = (req, res, next) => {
  res.render("pages/tac");
};

exports.getOrders = (req, res, next) => {
  // const user = req.user;
  // console.log('req.user===>>>', user);
  req.user
    .getOrders({ include: ["products"] })
    // .getOrders().then(orders=>{
    //   console.log("orders===>>>",orders);
    //   return orders.getProducts()
    // })
    .then((orders) => {
      console.log("orders===>>>",orders);
      res.render("pages/orders", {
        path: "/orders/",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let currentCard;
  req.user
    .getCart()
    .then((cart) => {
      currentCard = cart;
      // console.log("cart==>>",cart);
      return cart.getProducts()
      .then((products) => {
        // console.log("products in cart==>", products);
        return req.user.createOrder().then(order=>{
          // console.log('current order==>>',order);
          return order.addProducts(
            products.map(product=>{
              product.orderItem = {quantity : product.cartItem.quantity};
              return product;
            })
          )
        });
      }).then(result=>{
        return currentCard.setProducts(null)// почистили корзину
      })
      .then(result=>{
         res.redirect("/orders");
      })
    })
    .catch((err) => console.log(err));
};
