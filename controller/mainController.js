const Product = require("../models/product");
const Order = require("../models/order");
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const User = require("../models/users")
const fs = require("fs");



exports.getHomePage = (req, res, next) => {
 
  // console.log("REQ session==>>",req.session);
  // console.log("REQ session is loggedin==>>",req.session.isLoggedIn);
  Product
    .find()
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
  res.render("pages/contact",);
};

exports.getFaqPage = (req, res, next) => {
  res.render("pages/faq",);
};

exports.getDeliveryPage = (req, res, next) => {
  res.render("pages/delivery",);
};

exports.getSpecialOfferPage = (req, res, next) => {
  res.render("pages/special_offer",);
};

exports.getCompairPage = (req, res, next) => {
  res.render("pages/compair",{

  });
};

exports.getComponentsPage = (req, res, next) => {
  res.render("pages/components",);
};

exports.getForgetPassPage = (req, res, next) => {
  res.render("pages/forgetpass",);
};

exports.getLegalNoticePage = (req, res, next) => {
  res.render("pages/legal_notice",);
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
    console.log(products);
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
      // console.log(result);
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
  res.render("pages/register",{
    // isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getTACPage = (req, res, next) => {
  res.render("pages/tac",);
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
    .then(result=>{
      // console.log('result=====>>>',result._id);
      Order.find({'user.userId':result._id})
      .then(orders=>{
        // console.log('result2=====>>>',orders);
        let products = orders[orders.length - 1].products;
     console.log('result2=====>>>',products);
    //  console.log('result2=====>>>',req);

        function html() {
          let total = 0;
          let html = `<h3><span style="color:#000">You make an order ${req.user.name}</span></h3>`;
          for (let product of products) {
              total += product.product.price * product.quantity;
              if(!product.product.sale){
                product.product.sale = "";
              }else{
                product.product.sale += "UAH"
              }
              let orderCreated =new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear();
              html += `
              <!DOCTYPE html>
              <html lang="en">
                  <head>
                  <link href="themes/css/bootstrap-responsive.min.css" rel="stylesheet"/>
	                <link href="themes/css/font-awesome.css" rel="stylesheet" type="text/css">
                      <style>
                      .table th, .table td {
                              padding: 8px;
                              line-height: 20px;
                              text-align: left;
                              vertical-align: top;
                              border-top: 1px solid #ddd;
                              text-align:center;                            
                      }
                      .table-bordered th, .table-bordered td{
                          border-left: 1px solid #ddd;
                      }
                      body{
                         background-color: #eee;
                      }
                      </style>
              </head>
              <body>
                   <table class="table table-bordered" style="border: 1px solid #ddd;border-collapse: separate;width: 100%;
                     margin-bottom: 20px;font-size: 13px;">
                  <thead>
                      <tr>
                          <th style="text-align:center">Product</th>
                          <th>Description</th>
                          <th>Quantity/Update</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              <img width="60" src="${product.product.imageUrl}"
                                  alt="" />
                          </td>
                          <td>${product.product.shortDescription}</td>
                          <td>${product.quantity}</td>
                          <td>${product.product.price}</td>
                          <td>${product.product.sale} UAH</td>
                          <td colspan="2">${product.product.price * product.quantity} UAH</td>
                          
                      </tr>
                          <tr >
                              <td colspan="2"><h5 style="margin-bottom: 50px;">Created: ${orderCreated} </h5></td>
                              <td colspan="4"><h5 style="margin-bottom: 10px;">TOTAL = ${total} UAH </h5></td>
                              
                          </tr>
                  </tbody>
              </table>
              <img width="350"; width="550px"; src="http://i.piccy.info/i9/480a856a75b725d8a12f7182861b6418/1603027889/15110/1401213/logo.png" alt="">
              
              <div class="container">
              <div class=:row>
              <div class="span4">
            <h4>Contact Details</h4>
            <p>	18 Fresno,<br/> CA 93727, USA
                <br/><br/>
                info@bootsshop.com<br/>
                ﻿Tel 123-456-6780<br/>
                Fax 123-456-5679<br/>
                web:bootsshop.com
            </p>		
            </div>
            </div>
            </div>
              </body>
               </html>
              `;
          };
          return html;
      }
/*Стоврили обєки(лист) де ключами внесено наступні дані: Адресат, відправкник, тема листа, тіло листа */
      let email = {
          to:req.session.user.email,
          from: 'bootshopbot@gmail.com',
          subject:`Hello  you make an order in the store BootShop`,
          text: 'Order',
          html:html(),
          attachments: [{
            filename: '1.png',
            path: __dirname +'/1.png',
            cid: '1'
       }],
      };
/*Прописали транспорт(сервіс) через який буде відбуватись відправка. Якщо це гугл треба в gmail увімкнути доступ стороннім додаткам */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bootshopbot@gmail.com',
        pass: 'Bootshop_123' 
      }
    });
/*Відправка листа */
transporter.sendMail(email, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
      })
    })
    .then(() => {
      res.redirect("/orders",);
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart",);
    })
    .catch((err) => console.log(err));
};
