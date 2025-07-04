require('dotenv').config();

const express = require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
const about = "This blog was created to share knowledge, creativity, and passion. Whether it's tech tutorials, life experiences, or personal thoughts — we believe every story has value. Built by developers, for everyone.";
const home = "Welcome to our blog! Discover stories, tutorials, and insights from developers, writers, and creators. Stay updated with the latest posts and ideas that matter.";
const contact = "Have questions, feedback, or want to collaborate? We'd love to hear from you! Reach out to us through email or social media. Your thoughts make this blog better.";
app.set('views');
const path = require('path');
var posts=[];
const MONGODB_URI = process.env.MONGODB_URI;
const EDEN_API_KEY = process.env.EDEN_API_KEY ;

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));
const postSchema = new mongoose.Schema({
    name: String,
    description: String
    });
    const Post = mongoose.model('Post', postSchema);
  
app.use(express.static(path.join(__dirname, '/blog-css')));
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find().exec();
    res.render('home', {
      homes: home,
      posts: posts
    });
  } catch (err) {
    console.error("Error loading home:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/posts/:postId', (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findById(requestedPostId)
    .then(post => {
      if (post) {
        res.render("post", {
          name: post.name,
          description: post.description
        });
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch(err => {
      console.error("Error retrieving post:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get('/about',(req,res)=>{
    res.render("about",{ abouts:about });
});
app.get('/contact',(req,res)=>{
    res.render("contact",{ contacts:contact });
});
app.get('/compose',(req,res)=>{
    res.render("compose");
});
app.post('/compose',(req,res)=>{
    const Post1=new Post({
        name:req.body.name,
        description:req.body.description
    });
    
  Post1.save()
    .then(() => res.redirect("/"))
    .catch(err => console.error("Error saving item:", err));

});

app.post('/ai-generate', async (req, res) => {
  const topic = req.body.topic;
  if (!topic) {
    return res.status(400).json({ error: 'No topic provided' });
  }
  try {
    const response = await axios.post(
      'https://api.edenai.run/v2/text/generation',
      {
        providers: "openai",
        text: `Write a beautiful, detailed blog post about: ${topic}`,
        temperature: 0.7,
        max_tokens: 700,
        fallback_providers: ""
      },
      {
        headers: {
          'Authorization': `Bearer ${EDEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const aiText = response.data.openai.generated_text;
    res.json({ text: aiText });
  } catch (err) {
    console.error('Eden AI error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to generate blog post' });
  }
});

app.listen(3000,()=>{
    console.log("server started");
});

