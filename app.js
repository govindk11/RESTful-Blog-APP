var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app= express();

//MONGO setup
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//model config
var blogSchema= new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    created: {type: Date, default:Date.now}
});
var Blog = mongoose.model("Blog", blogSchema)

//restful routes
app.get("/", function(req, res){
    res.redirect("/blogs");
})
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    }) 
});


const port = 3000;
app.set("port", process.env.port || port);  // set express to use this port
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port: ${port}`);
  });