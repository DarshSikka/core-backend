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
	const posts=await Post.find({}, 'description _id title author').sort([["views", -1]]);
	res.send(posts);
})
router.get("/fetchslug", async(req, res)=>{
	const {slug}=req.query;
	const challenge=await Post.findOne({_id:slug});
	challenge.views+=1;
	challenge.save();
	res.send(challenge);
})
module.exports = router;
