const express = require('express');
const app = express();
const posts = require('./posts.json');
const fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req,res){
    res.send('Hello world!');
})

app.get('/books', function(req, res){
    res.send('There are 4 books in store');
})

app.post('/', function(req,res){
    res.send('this is a post request')
})

app.get('/posts', (req,res)=>{
    // fetch all posts
    // send the posts array as response to the client
    return res.json({ posts })
})
//create new user
app.post('/posts',(req,res)=>{
    console.log(req.body.newPost)
 // create a new post from cient's request   
 //save new post to existing database
 posts.push(req.body.newPost);
  //save updated data to posts.json
// stringify the json data
let stringedData =JSON.stringify(posts, null, 2);
fs.writeFile('posts.json', stringedData, function(err){
    if (err){
        return res.status(500).json({message: err})
    }
})
return res.status(200).json({message: 'new post created'})
})
// fetch single post
app.get('/posts/:id',(req, res)=>{
    //fetch req.params.id
    let id = req.params.id;
    //find user wth id
   let foundPost = posts.find(post =>{
       return String(post.id) === id;
    })
    if(foundPost){
        return res.status(200).json({ post:foundPost })   
    }else{
        return res.status(404).json({ message: "user not found"})
    }
})
 //send back a response to client
app.listen(3000, function(){
    console.log('server is up and running')
})