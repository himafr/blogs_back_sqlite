const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  postName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
  },
  postDesc: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 4500,
    trim: true,
  },
});

module.exports = Post;