//jshint esversion:6
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash")
const mongoose =require("mongoose")
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const Post =mongoose.model("Post",{
  postName:String,
  postDesc:String
})


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/",(req,res)=>{
  Post.find({}).then((posts)=>{
    res.render("home",{home:homeStartingContent,posts:posts})
  })

})
app.get("/about",(req,res)=>{
  res.render("about",{about:aboutContent})
})
app.get("/contact",(req,res)=>{
  res.render("contact",{contact:contactContent})
})
app.get("/compose",(req,res)=>{
  res.render("compose")
})

app.get("/posts/:md",(req,res)=>{
  const d=_.lowerCase(req.params.md)
  Post.find({}).then((posts)=>{
    posts.forEach((na)=>{
      const postn =_.lowerCase(na.postName)
      if(postn===d){
        res.render("post",{postTitle:na.postName,postPost:na.postDesc,postId:na.id})
      }
    })
  })
})
app.post("/add",(req,res)=>{
  const composeTitle=req.body.composeTitle
  const composePost=req.body.composePost
  const post=new Post({
    postName:composeTitle,
    postDesc:composePost
})
post.save();
res.redirect("/")
})

app.post("/delete",(req,res)=>{
  const id=req.body.del
  Post.findByIdAndDelete(id).then(
  res.redirect("/")  
)
 })
 app.post("/update",(req,res)=>{
  const composeTitle=req.body.composeTitle
  const composePost=req.body.composePost
  const update=req.body.update

   Post.findByIdAndUpdate(update,{
    postName:composeTitle,
    postDesc:composePost
}).then(
  res.redirect("/")
)
 })
app.post("/upd",(req,res)=>{
  const id =req.body.update
  const name =req.body.name
  const desc =req.body.desc
  res.render("update",{postTitle:name,postPost:desc,postId:id})
})

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})
