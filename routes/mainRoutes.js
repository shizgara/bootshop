// підключили метод express і express.router()
const express = require("express");
const mainController = require("../controller/mainController");

const router = express.Router();

router.get("/", mainController.getHomePage);
router.get("/contact",mainController.getContact);
router.get("/faq", mainController.getFaqPage);
router.get("/delivery", mainController.getDeliveryPage);
router.get("/special_offer", mainController.getSpecialOfferPage);
router.get("/compair", mainController.getCompairPage);
router.get("/components", mainController.getComponentsPage);
router.get("/forgetpass", mainController.getForgetPassPage);
router.get("/legal_notice", mainController.getLegalNoticePage);
// router.get("/login", mainController.getLoginPage);
router.get("/product_detail/:id", mainController.getProductDetailPage);
router.get("/product_summary", mainController.getCart);
router.post("/product_summary", mainController.postCart);
router.get("/products", mainController.getProductsPage);
router.get("/register", mainController.getRegisterPage);
router.get("/tac", mainController.getTACPage);

router.get("/cart", mainController.getCart);
router.post("/cart", mainController.postCart);
router.post("/cart-delete-item", mainController.postCartDeleteProduct);
router.get("/orders", mainController.getOrders);
router.post("/make-order", mainController.postOrder);


module.exports = router;
