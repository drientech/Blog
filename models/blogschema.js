var mongoose = require("mongoose");
 
var Schema = mongoose.Schema;

//Schema DataBase
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    category: {
      type: String
    },
   
    created:{  type: Date,
              required: true,
              default: Date.now
            },
          
         
  slug:{
   type:String,
   unique: true

              }

});

blogSchema.pre('save', async function (next) {
  try {
      // check if a new campground is being saved, or if the campground name is being modified
      if (this.isNew || this.isModified("title")) {
          this.slug = await generateUniqueSlug(this._id, this.title);
      }
      next();
  } catch (err) {
      next(err);
  }
});


var Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;

async function generateUniqueSlug(id, blogTitle, slug) {
  try {
      // generate the initial slug
      if (!slug) {
          slug = slugify(blogTitle);
      }
      // check if a campground with the slug already exists
      var blogs = await Blog.findOne({slug: slug});
      // check if a campground was found or if the found campground is the current campground
      if (!blogs || blogs._id.equals(id)) {
          return slug;
      }
      // if not unique, generate a new slug
      var newSlug = slugify(blogTitle);
      // check again by calling the function recursively
      return await generateUniqueSlug(id, blogTitle, newSlug);
  } catch (err) {
      throw new Error(err);
  }
}

function slugify(text) {
  var slug = text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
    .substring(0, 75);           // Trim at 75 characters
  return slug + "-" + Math.floor(1000 + Math.random() * 9000);  // Add 4 random digits to improve uniqueness
}
