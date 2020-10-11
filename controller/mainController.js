const Product = require("../models/product");
const Order = require("../models/order");

exports.getHomePage = (req, res, next) => {
  // console.log("req==>>",req.isLoggedIn);
  // console.log("REQ==>>",req);
  Product
    .find()
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
    .findById(productID)
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
  req.user
  .populate("cart.items.productId")
  .execPopulate()
  .then((user) => {
    const products = user.cart.items;
    res.render("pages/product_summary", {
      path: "/product_summary",
      product: products,
    });
  })
  .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
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
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("pages/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};