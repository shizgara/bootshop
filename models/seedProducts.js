// const sequelize = require("sequelize");
const product = require("./product");

exports.createProduct = ()=>{ 
  return product.bulkCreate([
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
  {
    title: "19 LCD LED монітор Philips V-line 193V5LSB2/62",
    price: "1099",
    sale: "100",
    imageUrl: "https://i.postimg.cc/BQxPJrJC/IMG-1004.jpg",
    quantity: "1",
    color: "black",
    shortDescription: "Діагональ дисплея 18.5, Максимальна роздільна здатність дисплея 1366x768, Тип матриці TN+film, Час реакції матриці 5 мс, Яскравість дисплея 200 кд/м², Контрастність дисплея 700:1",
    fullDescription: "Діагональ дисплея\r\n 18.5\r\nЧастота оновлення\r\n60 Гц\r\nМаксимальна роздільна здатність дисплея\r\n1366x768\r\nТип матриці\r\nTN+film\r\nЧас реакції матриці\r\n5 мс\r\nВбудований тюнер\r\nНемає\r\nЯскравість дисплея\r\n200 кд/м²\r\nІнтерфейси\r\nVGA\r\nКонтрастність дисплея\r\n700:1\r\n(SmartContrast: 10 000 000 : 1)\r\nКут огляду горизонтальний\r\n90 º\r\nВбудовані колонки\r\nНемає",
    brand: "Philips",
    model: "Philips V-line 193V5LSB2/62",
    released: new Date(),
    dimensions: "437 x 338 x 170 мм 2.15 кг",
    displaySize: "18.5",
    features: "Насолоджуйтесь чудовою якістю яскравого LED-зображення",
  }],
);
}
