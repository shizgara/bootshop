// підключили метод express і express.router()
const express = require("express");
const mainController = require("../controller/mainController");
const auth = require("../helper/auth-helper")//Костиль який блокує доступ до адмін панелі без авторизації

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
router.get("/product_detail/:id", mainController.getProductDetailPage);
router.get("/product_summary",auth, mainController.getCart);
router.post("/product_summary",auth, mainController.postCart);
router.get("/products", mainController.getProductsPage);
router.get("/tac", mainController.getTACPage);
router.get("/cart",auth, mainController.getCart);
router.post("/cart",auth, mainController.postCart);
router.post("/cart-delete-item",auth, mainController.postCartDeleteProduct);
router.get("/orders",auth, mainController.getOrders);
router.post("/make-order",auth, mainController.postOrder);


module.exports = router;
