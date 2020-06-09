var express =require("express"),
router = express();
var Form =require ("../models/form");
var middleware = require("../middleware/index");
 
router.get("/" , function(req,res){
    Form.find(function(err,form){
        if(err){
            console.log(err);
            res.redirect("back");
        }  else{
   
           res.render("contact" , {form: form});  
        }
   
    })
        
   });


   router.get("/form" ,middleware.isLoggedIn, function(req,res){
    Form.find(function(err,form){
        if(err){
            console.log(err);
            res.redirect("back");
        }  else{
   
           res.render("admin/form" , {form: form});  
        }
   
    })
        
   });


router.post("/",function(req,res){
     
    Form.create(req.body.form, function(err,newForm){
           
              if(err){
                  console.log(err);
                  res.redirect("back");
              }
              else {
                  res.redirect("/blogs");
              }
    });
       
  });



  router.delete("/:id",middleware.isLoggedIn, function(req,res){
    Form.findOneAndRemove(req.params.id,function(err){
             if(err){
                 res.redirect("/dashboard");
             }
             else{
                 res.redirect("/contact/form");
             }
    });
 });

  module.exports = router;
