const express = require("express");
const Post = require("../models/Post");
const cors=require("cors");
const sqlite=require("sqlite3").verbose();
const router = express.Router();
router.post("/new", cors(), (req, res) => {
  const { title, author, description, video } = req.body;
  const post = new Post({ title, author, description, video:"in sqlite" });
  post.save();

const db=new sqlite.Database(__dirname+"/urls.db", (err, result)=>{
	if(err) console.error(err);
	db.run(`INSERT INTO main (id, uri) 
	VALUES ("${post._id}", "${video}")`, [], (err, rows)=>{
	db.all(`SELECT * FROM main WHERE id="${post._id}"`, [], (e, r)=>{

    res.send(post);
    console.log(post);
		console.log(r);
	})
  })
})
  
});
router.get("/all", cors(), async (req, res)=>{
	const posts=await Post.find({}, 'description _id title author').sort([["views", -1]]);
	res.send(posts);
})
router.get("/fetchslug", async(req, res)=>{
	const {slug}=req.query;
	const challenge=await Post.findOne({_id:slug});
	challenge.views+=1;
	challenge.save()

const db=new sqlite.Database(__dirname+"/urls.db", (err, result)=>{  
	if(err) console.error(err);
	db.all(`SELECT uri FROM main WHERE id="${challenge._id}"`, [], (err, rows)=>{
		if(err) console.error(err);
		res.send({...challenge, url: rows});
	})
})
})
router.post("/reply", cors(), (req, res)=>{
	const {id, vid, author}=req.body;
	console.log(id);
	const db=new sqlite.Database(__dirname+"/replies.db", (err)=>{
		if(err) console.error(err);
		db.run(`INSERT INTO replies (id, video, author)
		VALUES ("${id}", "${vid}", "${author}")`
		)
		res.send("SAVED");
	});
})
router.get("/replies/:slug", cors(), (req, res)=>{
	const {slug}=req.params;
	const db=new sqlite.Database(__dirname+"/replies.db", (er)=>{
		db.all(`SELECT * FROM replies WHERE id="${slug}"`, (err, result)=>{
			res.send(result);
		})
	});
})
module.exports = router;
