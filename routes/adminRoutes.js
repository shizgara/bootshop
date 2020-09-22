// підключили метод express і express.router()
//Спочатку метод express і тільки тобі підключаєм метод router(). Інакше працювати не буде
const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminContreller");


router.get("/products", adminController.getProducts);
router.get('/products_delete/:id',adminController.deleteProduct);
router.get('/edit_product/:id',adminController.getEditProduct);
router.post('/product_editConfirm/:id',adminController.confirmEditProduct);
router.get('/add-product',adminController.addProductGet);
router.post('/add-product',adminController.addProductPost);
router.get('/',adminController.getProducts);
router.get("/users", adminController.getUsers);
router.get("/admin_products_detail/:id", adminController.getProductDetailPage);


module.exports = router;
