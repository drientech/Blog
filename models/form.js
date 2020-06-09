var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var formSchema = new mongoose.Schema({
   
       name:String,
       email:String,
       subject:String,
       message:String

      
});
     

var Form = mongoose.model("form", formSchema);
  module.exports = Form;
