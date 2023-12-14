const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// @desc Crear un usuario
// @route GET /api/posts
// @access Private
const createUser = (req, res) => {
  res.json({ message: "Create user" });
};

module.exports = {
  createUser,
};
