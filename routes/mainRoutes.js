// підключили метод express і express.router()
const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");

router.get("/", mainController.getHomePage);
router.get("/contact",mainController.getContact);
router.get("/faq", mainController.getFaqPage);
router.get("/delivery", mainController.getDeliveryPage);
router.get("/special_offer", mainController.getSpecialOfferPage);
router.get("/compair", mainController.getCompairPage);
router.get("/components", mainController.getComponentsPage);
router.get("/forgetpass", mainController.getForgetPassPage);
router.get("/legal_notice", mainController.getLegalNoticePage);
router.get("/login", mainController.getLoginPage);
router.get("/product_detail/:id", mainController.getProductDetailPage);
router.get("/product_summary", mainController.getCart);
router.post("/product_summary", mainController.postCart);
router.get("/products", mainController.getProductsPage);
router.get("/register", mainController.getRegisterPage);
router.get("/tac", mainController.getTACPage);
router.get("/orders",mainController.getOrders);


module.exports = router;
