const User = require("../models/users");
const bcrypt = require("bcryptjs");//Бібліотека для шифрування паролей


exports.getLogin = (req,res,next)=>{
    // console.log("hetLogin===>>>",req.session.isLoggedIn);
    res.render("pages/login");
}

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;// Отримуємо в змінн дані з форми(email,password)
    // console.log('email===>',email, 'password===>>>', password);
    // console.log("BODY===>>",req.body)
    User.findOne({ email: email })//Перевірка в БД чи є даний юзер з таким email
      .then((user) => {
        // console.log(user)
        if (!user) {
          return res.redirect("/login");// якщо по емейлу не знаходить такого юзера робить редірект на сторінку login
        }
        bcrypt.compare(password, user.password).then((match) => {//Перевірка чи співпадає пароль введений з хешованим в базі. Тут повертає значення true або false
          if (match) {
            // console.log('match====>>>>',match)
            req.session.isLoggedIn = true;//Сесії присвоюєм сатус "залогінений"
            req.session.user = user;// Юзеру сесії присвоюємо значення юзера з БД
            // console.log('req.session.user====>>>>',req.session.user)
            return req.session.save((err) => {//зберігаємо сесію
              res.redirect("/");
            });
          }
          res.redirect("/login");
        });
      })
      .catch((err) => console.log(err));
  };

exports.getRegister = (req,res,next)=>{
    res.render("pages/register")
}

exports.postRegister = (req, res, next) => {
    const { username, email, password, confirm_password } = req.body;//даним змінним присвоїли дані з req.body(реструктеризація)
    if (password === confirm_password) {// перевірка чи однакові дані паролі
      User.findOne({ email: email })//шукають в базі user по email чи не зареєстрований такий користувач
        .then((user) => {
          if (user) {
            return res.redirect("/login");//якщо такий email вже є робимо редірект на сторінку login
          }
          return bcrypt.hash(password, 12);// якщо такого email в базі не знайдено за допомогою метода brypt.hash() шифруємо пароль ітеруючи його дані 12 разів 
        })
        .then((hashPassword) => {
          const newUser = new User({//Створюємо нового юзера і передаємо дані з форм в базу(name,password,email)
            name: username,
            email: email,
            password: hashPassword,
            cart: { items: [] },
          });
          return newUser.save();//Зберігаємо нового юзера в БД
        })
        .then((result) => {
          res.redirect("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  exports.postLogout = (req,res,next)=>{
    // console.log('req.session===========>>>',req.session);
    req.session.destroy(err=>console.log('error logout===>>>',typeof(err)));//Методом destroy знищуємо активну сесію
    res.redirect("/")   
  }