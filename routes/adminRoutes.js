// підключили метод express і express.router()
//Спочатку метод express і тільки тобі підключаєм метод router(). Інакше працювати не буде
const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminContreller");


router.get("/admin/products", adminController.getProducts);
router.get('/admin/products_delete/:id',adminController.deleteProduct);
router.get('/admin/add-product',adminController.addProductGet);
router.post('/admin/add-product',adminController.addProductPost);


module.exports = router;
