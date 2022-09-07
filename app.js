//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var _ = require('lodash');

const homeStartingContent = "You entered home route ...";
const aboutContent = "You entered about route ...";
const contactContent = "You entered Contact route ...";

const app = express();

app.set('view engine', 'ejs');
var posts =[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req , res){
  res.render("home",{
    startingContent:homeStartingContent,
    posted: posts
  });
});


app.get("/post/:postName", function(req , res){
  const requestPostName =  _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const StoredName =  _.lowerCase(post.title);
    if(requestPostName === StoredName){
      res.render("post",{
        title: post.title,
        content: post.content
    });
    }
    
  });
 
});



app.get("/contact", function(_,res){
  res.render("contact",{contactPage:contactContent});
})

app.get("/about",function(_,res){
  res.render("about",{aboutPage:aboutContent});
})

app.get("/compose", function(_, res){
    res.render("compose");
})

app.post("/compose",function(req,res){

  const post ={
    title: req.body.postTitle,
    content: req.body.postText
  };
  posts.push(post);
  res.redirect("/");
 
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
