var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index");

//ROUTES
 


//======================== 
//ROUTE AUTH
//========================

//REGISTER FORM
router.get("/register",function(req,res){
   
    res.render("register");
});


router.post("/register",function(req,res){

 var newUser = new User({username: req.body.username});
 User.register(newUser,req.body.password , function(err,user){
       if(err){
            // req.flash("error",err.message);
             return res.render("register");
       }

       passport.authenticate("local")(req,res, function(){
           //req.flash("success","welcome " + user.username);
             res.redirect("/blogs");
       })
 });

});


//LOGIN FORM
router.get("/login",function(req,res){
    
 
           res.render("login");
     
   
});


router.post("/login", passport.authenticate("local", {
   successRedirect: "/dashboard",
   failureRedirect: "/login"
}) ,function(req, res){
});



//LOGOUT 
router.get("/logout", function(req, res){
   req.logout();
  // req.flash("success","You logged Out");
   res.redirect("/");
});

 router.get("/dashboard",middleware.isLoggedIn,function(req,res){
        res.render("admin/dashboard");
 });

module.exports = router;