const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const postRoute =require('./router/postRoute')
const contactRoute=require('./router/contactRoute')
const aboutRoute=require('./router/abouteRoute')

// middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/',(req,res)=>res.redirect("/posts"))
app.use('/posts',postRoute)
app.use('/contact',contactRoute)
app.use('/about',aboutRoute)

module.exports=app