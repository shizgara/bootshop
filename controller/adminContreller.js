// const { promiseImpl } = require("ejs");
// const sequalize = require("sequelize");
const product = require("../models/product");
const users = require("../models/users");

exports.getProducts = (req, res, next) => {
  product
    /*findAll() - метод sequalize, який зчитує дані всієї таблиці */
    .findAll()
    .then((dataproducts) => {
      // console.log("products ====>>>>", products)
      res.render("admin/products", {
        products: dataproducts,
        pageTitle: "All products",
        // path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  // console.log("Наші параметри ====>>>>>>",req.params);
  const productID = req.params.id;
  product
    .findByPk(productID)
    .then((dataproduct) => {
      /*Метод destroy() - видаляє курс */
      return dataproduct.destroy();
    })
    .then((result) => {
      console.log("Product Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.addProductGet = (req, res, next) => {
  res.render("admin/add-product");
};

/*Метод відловлює дані для додавання курсу */
exports.addProductPost = (req, res, next) => {
  console.log("addpost logs==========>>>>>>", req);
  const title = req.body.title;
  const price = req.body.price;
  const sale = req.body.sale;
  const imageUrl = req.body.imageUrl;
  const quantity = req.body.quantity;
  const color = req.body.color;
  const shortDescription = req.body.shortDescription;
  const fullDescription = req.body.fullDescription;
  const brand = req.body.brand;
  const model = req.body.model;
  const released = req.body.released;
  const dimensions = req.body.dimensions;
  const displaySize = req.body.displaySize;
  const features = req.body.features;

  users.findByPk(1).then((data) => {
    console.log("data from users====>>>>", data);
    let userId = data.id;
    console.log(userId)
    return userId;
  });
  console.log('userId====>>>>',userId);
  /*За допомогою метода create передаємо в БД(Course) дані які ввів користувач в полях  */
  product
    .create({
      title: title,
      price: price,
      sale: sale,
      imageUrl: imageUrl,
      quantity: quantity,
      color: color,
      shortDescription: shortDescription,
      fullDescription: fullDescription,
      model: model,
      brand: brand,
      released: released,
      dimensions: dimensions,
      displaySize: displaySize,
      features: features,
      userId: userId,
    })
    .then((result) => {
      console.log("Add product result ==>>", result);
      console.log("Product added");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  console.log("Move to Edit Product Route");
  const id = req.params.id;
  product
    .findByPk(id)
    .then((product) => {
      res.render("admin/edit_product", {
        product: product,
        time: new Date(),
        // id: id,
        //path:'/products_edit/',
      });
    })
    .catch((err) => console.log(err));
};

exports.confirmEditProduct = (req, res, next) => {
  console.log("Дані які прийшли з форми edit====>>>>", req.body);
  const title = req.body.title;
  const id = req.body.id;
  console.log("id---------->>>>>>>>>>>>>>", id);
  const price = req.body.price;
  const sale = req.body.sale;
  const imageUrl = req.body.imageUrl;
  const quantity = req.body.quantity;
  const color = req.body.color;
  const shortDescription = req.body.shortDescription;
  const fullDescription = req.body.fullDescription;
  const brand = req.body.brand;
  const model = req.body.model;
  const released = req.body.released;
  const dimensions = req.body.dimensions;
  const displaySize = req.body.displaySize;
  const features = req.body.features;

  /*За допомогою метода update передаємо(обновлюємо) в таблиці(product) дані які ввів користувач в полях  */
  product
    .update(
      {
        title: title,
        price: price,
        sale: sale,
        imageUrl: imageUrl,
        quantity: quantity,
        color: color,
        shortDescription: shortDescription,
        fullDescription: fullDescription,
        model: model,
        brand: brand,
        released: released,
        dimensions: dimensions,
        displaySize: displaySize,
        features: features,
      },
      { where: { id: id } }
    )
    .then((result) => {
      console.log("Update product result ==>>", result);
      console.log("Product added");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  users
    /*findAll() - метод sequalize, який зчитує дані всієї таблиці */
    .findAll()
    .then((data) => {
      // console.log("products ====>>>>", products)
      res.render("admin/users", {
        user: data,
        pageTitle: "All users",
        // path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetailPage = (req, res, next) => {
  const productID = req.params.id;
  product
    .findByPk(productID)
    .then((dataproducts) => {
      res.render("admin/admin_products_detail", {
        products: dataproducts,
        // pageTitle: "All products",
        // path: "pages/product_detail",
      });
    })
    .catch((err) => console.log(err));
};
