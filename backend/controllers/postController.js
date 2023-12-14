const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

// @desc Listar todos los posts
// @route GET /api/posts
// @access Private
const listPosts = asyncHandler(async (req, res) => {
  // const posts = await Post.find();
  res.status(200).json({ message: "Get posts" });
  // res.status(200).json(posts);
});

// @desc Crear un post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  // if (!req.body.text) {
  //   // Handle error
  //   res.status(400);
  //   throw new Error("Please add a text field");
  // }

  // const post = await Post.create({
  //   text: req.body.text,
  // });
  res.status(200).json({ message: "Crear Posts" });
  // res.status(200).json(post);
});

// @desc Editar un post
// @route PUT /api/posts/id:
// @access Private
const editPost = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.id);

  // if (!post) {
  //   res.status(400);
  //   throw new Error("Post not found");
  // }

  // const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  res.status(200).json({ message: `Update post ${req.params.id}` });
  // res.status(200).json(updatedPost);
});

// @desc Borrar un post
// @route DELETE /api/posts/id:
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.id);

  // if (!post) {
  //   res.status(400);
  //   throw new Error("Post not found");
  // }

  // await post.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: `Delete post ${req.params.id}` });
  // res.status(200).json({ id: req.params.id });
});

module.exports = {
  listPosts,
  createPost,
  editPost,
  deletePost,
};
