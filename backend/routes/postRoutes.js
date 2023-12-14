const express = require("express");
const router = express.Router();
const {
  listPosts,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postController");

// Esta linea hace la misma funcion que estas
// router.get("/", listPosts);
// router.post("/", createPost);
router.route("/").get(listPosts).post(createPost);

// Esta linea hace la misma funcion que estas
// router.put("/:id", editPost);
// router.delete("/:id", deletePost);
router.route("/:id").put(editPost).delete(deletePost);

module.exports = router;
