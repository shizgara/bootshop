const product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  product
    .findAll()
    .then((products) => {
      res.render("pages/home", {
        products: products,
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
  res.render("pages/product_detail");
};

exports.getProductSummaryPage = (req, res, next) => {
  res.render("pages/product_summary");
};

exports.getProductsPage = (req, res, next) => {
  res.render("pages/products");
};

exports.getRegisterPage = (req, res, next) => {
  res.render("pages/register");
};

exports.getTACPage = (req, res, next) => {
  res.render("pages/tac");
};
