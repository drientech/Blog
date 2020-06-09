var express =require("express"),
router = express();
var Category =require("../models/category");

router.get("/",function(req,res){
    
      res.render("about");
   
   });


 


module.exports = router;