var express =require("express"),
router = express();
var Blog =require ("../models/blogschema");
var Category =require("../models/category");
var middleware = require("../middleware/index");
//RESTFUL ROUTES
//========================================================================================================================= 

 
router.get("/",function(req,res){
   var noMatch=null;
   if(req.query.search) {
    var regex = new RegExp(escapeRegex(req.query.search), 'gi');
    
   Blog.find({title: regex},function(err,blogs){
       if(err){
           console.log(err);
           res.render("404");
       }
   
       else{
        if(blogs.length < 1) {
            noMatch = "No post match that query, please try again.";
        }
             res.render("index" , {blogs: blogs, noMatch: noMatch }) ;
       }
   });
}
else{
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
            res.render("404");
        } else {
           res.render("index",{blogs:blogs, noMatch: noMatch});
        }
     });
 
}
   
});



//New Blog Form To create a new blog post
router.get("/new" ,middleware.isLoggedIn, function(req,res){
 Category.find(function(err,category){
     if(err){
         console.log(err);
         res.redirect("back");
     }  else{

        res.render("admin/new" , {category: category});  
     }

 })
     
});




// CREATE POST REQUEST 
router.post("/",middleware.isLoggedIn,function(req,res){
     
  Blog.create(req.body.blog, function(err,newBlog){
         
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else {
                res.redirect("/blog");
            }
  });
     
});

 
 


//Show ROUTE 
//========================================================================================================================
router.get("/:slug",function(req,res){
   Category.find(function(err,category){
     if(err){
       res.redirect("back");
     }
     else{
       Blog.findOne({slug: req.params.slug},function(err,foundBlog){
        if(foundBlog == null){
             
            res.render("404");
        } else{
            Blog.find({slug: {$gt: foundBlog.slug}}).sort({slug: 1}).limit(1).exec(function (err, nextBlog) {
                if (err) {
                  console.log(err);
                } else {
                  Blog.find({slug: {$lt: foundBlog.slug}}).sort({slug: -1}).limit(1).exec(function (err, previousBlog) {
                    if (err) {
                      console.log(err);
                    } 
       
            else{  
             res.render("show",{
                blog: foundBlog, 
                category: category ,
                nextBlog: nextBlog[0],
                previousBlog: previousBlog[0]
           
            }); 
                  }
    
                  });
   }})}})}})});

 
 

//Edit Form
//========================================================================================================================

router.get("/:slug/edit",middleware.isLoggedIn,function(req,res){
    Blog.findOne({slug: req.params.slug} , function(err,foundBlog){
   
    if(foundBlog == null){
           res.redirect("/blog");
 
       }
       else{
   
             
            res.render("admin/edit",{blog: foundBlog});
        
           
       }
    });
});

//UPDATE 
//=========================================================================================================================
router.put("/:slug",middleware.isLoggedIn,function(req,res){
    
   Blog.findOne({slug: req.params.slug } ,function(err,blog){
    
    if(err){     
                console.log(err);
                res.redirect("/blog/" + req.params.slug);

            } else {
               
                    
                    blog.title = req.body.blog.title;
                   blog.image = req.body.blog.image;
                   blog.body = req.body.blog.body;

                  
                   
                   blog.save(function(err){
                       if(err){
                           console.log(err);
                           res.send("error");
                       }
                       else{
                           res.redirect("/blog/" + blog.slug);
                       }
                   });
                  
                      
                 
                 
            }
   });
});

 



//Delete route
//========================================================================================================================
router.delete("/:slug",middleware.isLoggedIn,function(req,res){
  Blog.findOneAndRemove({slug: req.params.slug},function(err){
    if(err == null){
               res.redirect("/blog");
           }
           else{
               res.redirect("/blog");
           }
  });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
