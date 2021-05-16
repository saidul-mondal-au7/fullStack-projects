const express = require("express");
const app = express();
const cors = require("cors");
// const dotenv = require('dotenv');
require("./db");
const Post = require('./todoSchema')
// dotenv.config()

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newPost = new Post({ description });

    const savedPost = await newPost.save();
    res.json(savedPost);

  } catch (err) {
    res.send(err.message);
    res.status(500).send();
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Post.findById(id);

    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdate = ["description"]
  const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))
  
  if(!isValidOperation){
    return res.status(400).send({error:'Invalid updates!'})
  }
  try{
    const update_post = await Post.findById(req.params.id)
    updates.forEach((update)=>update_post[update]=req.body[update])
    await update_post.save()
    //const update_post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!update_post){
      return res.status(404).send()
    }
    res.send(update_post)

  }catch(e){
    res.status(400).send(e)
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try{
    const delete_post = await Post.findByIdAndDelete(req.params.id)
    console.log(req.params.findByIdAndDelete)
    if(!delete_post){
        return res.status(404).send()
    }
    res.send(delete_post)
  }catch(e){
    res.status(400).send(e)
}
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
