var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new mongoose.Schema({
    
    title: {
        type: String
       
    },
    slug: {
       type: String
   },
   img:{
       type: String
   }
     
     });
     
 
      var Category = mongoose.model("category", categorySchema);

      module.exports = Category;

 