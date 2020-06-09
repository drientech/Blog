var express =require("express"),
router = express();
var Blog =require ("../models/blogschema");
var Category =require("../models/category");
var middleware = require("../middleware/index");


//Category route
//========================================================================================================================


router.get("/",function(req,res){
   Blog.find({},function(err,categorys){
Category.find({},function(err,categorys){
        if(err){
            console.log(err);
            res.send("error");
        }
        else{
              res.render("category" , {categorys: categorys}) ;
        }
    })

   })
  
 });


router.get("/new" ,middleware.isLoggedIn,function(req,res){
    res.render("admin/new_category");
});

router.post("/new",middleware.isLoggedIn,function(req,res){
    Category.create(req.body.category , function(err,newCategory){
              if(err){
                  console.log(err);
                  res.redirect("/");
              }
              else {
                  res.redirect("/category");
              }
    });
       
  });



  
//=====================================================================

router.get("/:category",function(req,res){ 
 Blog.find({category:req.params.category},function(err,post){
            if(err){
                console.log(err);
                res.send("error");
            }  else{
                 
                res.render("category_show",{post: post,category: req.params.category });
            }        
            
 });


});
    
router.get("/:id/edit",middleware.isLoggedIn,function(req,res){
    Category.findById(req.params.id, function(err,foundCategory){
              if(err){
                 //req.flash("error","not found");
                    res.redirect("/blogs");
              }
              else{
                    res.render("admin/edit_category" , {category: foundCategory});
              }
    })

            
});

  //Update 
  router.put("/:id",middleware.isLoggedIn,function(req,res){
     Category.findByIdAndUpdate(req.params.id ,req.body.category ,  function(err,updateCategory){
           if(err){
                // req.flash("error","err.message");
                 res.redirect("/blogs");
           } else{
                // req.flash("success","Updated successful");
                 res.redirect("/category");
           }
     })
       
    });
                      
                 
      
 

  
     


//=====================================================================
router.delete("/:id",middleware.isLoggedIn,function(req,res){
    Category.findOneAndRemove(req.params.id,function(err){
             if(err){
                 res.redirect("/category");
             }
             else{
                 res.redirect("/category");
             }
    });
 });

module.exports = router;