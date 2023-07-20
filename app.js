//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongodb=require("mongodb");
const mongoose = require("mongoose");
const _ = require("lodash");
const multer=require("multer");
// const JSON=require("json");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://rk1265489:bHnMGB6w31FD4sub@cluster0.wpkgmgy.mongodb.net/blogDB", {useNewUrlParser: true});


const postSchema = {
  title: String,
  content: String
  
  
};
const resultSchema={
  name:String,
  number:String,
  email:String,
  feedback:String


};


const Postcontact=mongoose.model("Postcontact",resultSchema);

const Post = mongoose.model("Post", postSchema);

let posts = [];
let result=[];




app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody

   
  });

  post.save();
 res.redirect("/");

});
app.post("/contact",function(req,res){
  const contactcontents=new Postcontact({
    names:req.body.Name,
    number:req.body.Mobile,
    email:req.body.Email,
    feedback:req.body.postBody

  });
  contactcontents.save();
 
  res.redirect("/");
});














// app.get("/resultitem/:resultName", function(req, res){
//     console.log(req.params.resultName);

// });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact",{contactContent:contactContent});
});


let resultitem=[];
 
app.get("/blog",async (req,res)=>{
 
  result=await Post.find({});
 
  res.render("blog",{
    startingContent:homeStartingContent,
    resultitem:result
  });
  
 
});



app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent
   
    });
});

var today=new Date();
var optinon={
  weekday:"long",
  day:"numeric",
  month:"long"
};
var day=today.toLocaleDateString("en-US",optinon);
console.log(day);



app.get("/result/:resultName",function(req,res){

  const requestedTitle = _.lowerCase(req.params.resultName);

  result.forEach(function(result){
    const storedTitle = _.lowerCase(result.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: result.title,
        content: result.content,
      
       
       
        date:day
      });
    
    
    }
  });
 
});



// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);

//   result.forEach(function(result){
//     const storedTitle = _.lowerCase(result.title);

//     if (storedTitle === requestedTitle) {
//       res.render("result", {
//         title: result.title,
//         content: result.content
//       });
//     }
//   });

// });


let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port);





app.listen(port, function() {
  console.log("Server started has been on port successfully");
});
