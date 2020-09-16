const product = require("../models/product");

exports.getProducts = (req, res, next) => {
  product
  /*findAll() - метод sequalize, який зчитує цілу таблицю */
    .findAll()
    .then((products) => {
      // console.log("products ====>>>>", products)
      res.render("admin/products", {
        products: products,
        pageTitle: "All products",
        // path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};


exports.deleteProduct = (req, res, next) => {
    // console.log("Наші параметри ====>>>>>>",req.params);
    const productID = req.params.id;
    product.findByPk(productID)
      .then((product) => {
        /*Метод destroy() - видаляє курс */
        return product.destroy();
      })
      .then((result) => {
        console.log("Product Deleted");
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
  };

  exports.addProductGet = (req,res,next)=>{
    res.render("admin/add-product")
  };

  /*Метод відловлює дані для додавання курсу */
exports.addProductPost = (req, res, next) => {
  console.log(req.body);
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

  /*За допомогою метода create передаємо в БД(Course) дані які ввів користувач в полях  */
  product.create({
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
  })
    .then((result) => {
      console.log("Add product result ==>>", result);
      console.log("Product added");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};
