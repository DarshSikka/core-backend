const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
  author: {
    type: Object,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  replies: {
    type: Array,
    default: [],
  },
});
const Post = mongoose.model("Post", schema, "posts");
module.exports = Post;
