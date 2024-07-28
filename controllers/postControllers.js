const Post = require("../models/postModel");
const _=require("lodash")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

exports.getAllPosts =async (req, res) => {
    try{
        const posts=await Post.find({})
                res.render("home",{home:homeStartingContent,posts})
        }catch(err){
            res.send(err)
        }
};

exports.compose = async (req, res) => {
  res.render("compose")
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
};

exports.getPostById = async (req, res) => {
    try{
            const title=_.lowerCase(req.params.id)
            const posts=await Post.find({})
              posts.forEach((post)=>{
                const postTitle =_.lowerCase(post.postName)
                if(postTitle===title){
                  res.render("post",{post})
                }
              })            
        }catch(err){
            res.send(err)
        }
};

exports.getUpdatePage= async (req,res)=>{
  const id =req.params.id
  const post=await Post.findById(id)
  res.render("update",{post})
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
};
