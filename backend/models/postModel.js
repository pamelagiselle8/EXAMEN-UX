const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  titulo: {
    type: String,
  },
  texto: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
