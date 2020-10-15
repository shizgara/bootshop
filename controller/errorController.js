/* Створюємо і експортуємо метод get404,який віддає статус сторінки 404*/

exports.get404 = (req, res, next) => {
  /* відправляємо браузеру статус код 404 і рендеримо сторінку */
    res.status(404).render("pages/404", {
      pageTitle: "Page not Found",
      path: "/404",
      isAuthenticated: req.session.isLoggedIn,
    });
  };
  