/* Створюємо і експортуємо метод get404,який віддає статус сторінки 404*/

exports.get404 = (req, res, next) => {
    res.status(404).render("pages/404");
  };
  