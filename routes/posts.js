const express = require("express");
const Post = require("../models/Post");
const cors=require("cors");
const router = express.Router();
router.post("/new", cors(), (req, res) => {
  const { title, author, description, video } = req.body;
  const post = new Post({ title, author, description, video });
  post.save();
  res.send(post);
  console.log(post);
});
router.get("/all", cors(), async (req, res)=>{
	const posts=await Post.find({});
	res.send(posts);
})
module.exports = router;
