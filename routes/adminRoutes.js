// підключили метод express і express.router()
//Спочатку метод express і тільки тобі підключаєм метод router(). Інакше працювати не буде
const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminContreller");
const auth = require("../helper/auth-helper")//Костиль який блокує доступ до адмін панелі без авторизації


router.get("/products",auth, adminController.getProducts);
router.get('/products_delete/:id',auth,adminController.deleteProduct);
router.get('/edit_product/:id',auth,adminController.getEditProduct);
router.post('/product_editConfirm/:id',auth,adminController.confirmEditProduct);
router.get('/add-product',auth,adminController.addProductGet);
router.post('/add-product',auth,adminController.addProductPost);
router.get('/',auth,adminController.getProducts);
router.get("/users", auth,adminController.getUsers);
router.get("/admin_products_detail/:id", auth,adminController.getProductDetailPage);


module.exports = router;
