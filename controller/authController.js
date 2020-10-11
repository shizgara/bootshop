exports.getLogin = (req,res,next)=>{
    console.log("hetLogin===>>>",req.session);
    res.render("pages/login");
}

exports.postLogin = (req,res,next)=>{
    req.session.isLoggedIn = true;
    console.log("postlogin===>>>",req.body)
    res.redirect("/");
}