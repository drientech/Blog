//Conection with package like express , body parser and mongoose .
var express = require("express");
var app = express();
var moment = require("moment");


var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport =require("passport"),
LocalStrategy = require("passport-local"),
User   = require("./models/user");
var Category =require("./models/category");
var blog =require("./models/blogschema");
//methodOverride is to add a another method like delete or to edit something and we can use e methotd PUT 
//HTML dosen't offer this method , so we need to install this package  npm method-override 
var methodOverride = require("method-override");

//==============================================================
//conect DB
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false});
 //app Configuration , like first line of configuration is for remove ejs from all render who we made  in this file ,
 //second is for make public all the static file in public folder , file like .css , .js etc 
 //In order to get access to the post data we have to use body-parser.
 // Basically what the body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
app.set("view engine" , "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
 

app.use(methodOverride("_method"));
//==============================================================
//===========================================================
//PASSPORT CONFIG
//===========================================================
app.use(require("express-session")({
    secret:"albania",
    resave:false,
    saveUninitialized:false
 }));
 
 
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 app.locals.moment = require('moment');
 
 app.use(function(req,res, next){
        res.locals.currentUser = req.user;
        res.locals.moment = require("moment");

        // res.locals.error = req.flash("error");
        // res.locals.success = req.flash("success");
        next();
 
 });

//========================================================================================================================
//require routes
 var  indexRouter = require("./routes/index");
 var userRouter = require("./routes/user");
 var navRouter =require("./routes/nav");
 var formRouter =require("./routes/form");
 var categoryRouter =require("./routes/category");
//========================================================================================================================= 

 app.use("/blog", indexRouter);
 app.use("/category",categoryRouter);
app.use("/",userRouter);
app.use("/about",navRouter);
app.use("/contact",formRouter);


app.get("/",function(req,res){
   res.redirect("/blog") 
});
 
app.get("/*",function(req,res){
      res.render("404");

});
//========================================================================================================================= 
//SAFE PLACE
app.listen(3000,function () {
   console.log("server Conected"); 
});




 
