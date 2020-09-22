const sequelize = require("sequelize");
const product = require("./product");

const createProduct = product.create(
  {
    title: "Цифровий фотоапарат Canon SX530HS+Сумка+Заводська упаковка",
    price: "3099",
    sale: "100",
    imageUrl: "https://i.postimg.cc/PqLRgDZM/1.jpg",
    quantity: "1",
    color: "black",
    shortDescription: "Матриця 1/2.3, 16.0 Мп / Зум: 50x (оптичний), 4x (цифровий) / підтримка карток пам'яті SD/SDHC/SDXC / РК-дисплей 3 / Full HD-відео / живлення від літій-іонного акумулятора / 120 x 81.7 x 91.9 мм, 442 г / чорний",
    fullDescription: "Фотоапарат в дуже хорошому технічному і естетичному стані, сколів та тріщин не має.</br> Canon Powershot SX530HS Black</br>Комплект:</br>1. Фотоапарат</br>2. Зарядне</br>3.Сумка</br>4. Заводська упаковка + документи",
    brand: "canon",
    model: "Canon SX530HS",
    released: new Date(),
    dimensions: "Ширина 120 мм</br>Глибина 91.9 мм</br>Висота 81.7 мм",
    displaySize: "1/2.3",
    features: "masterpass",
  },

);

module.exports = createProduct;
