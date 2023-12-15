const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://pamelagiselle8:9qVsiVKp9FthiMnF@examenux.pt6lxir.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!".rainbow
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const database = client.db("examenux");
const posts = database.collection("Post");
const Post = require("../models/postModel");

// @desc Listar todos los posts
// @route GET /api/posts
// @access Private
const listPosts = async (req, res) => {
  // Buscar posts registrados en la collection
  const query = posts.find();
  // Validar si no hay posts
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
    });
  }
  // Si hay posts, guardar cada post en un arreglo
  let arrPosts = [];
  for await (const doc of query) {
    arrPosts.push(doc);
  }
  // Listar los posts
  res.status(200).send({
    documentos: arrPosts,
  });
};

// @desc Crear un post
// @route POST /api/posts
// @access Private
const createPost = async (req, res) => {
  // Crear un json con el esquema definido en postModel
  const post = await new Post({
    titulo: req.body.titulo,
    texto: req.body.text,
  });
  // Insertar el nuevo post en la collection
  const result = await posts.insertOne(post);
  // Mensaje de error si no se pudo crear
  if (!result.insertedId) {
    res.status(500).send({
      msg: "No se pudo crear el post",
    });
  }
  // Mensaje de éxito si logró crearse
  res.status(200).send({
    msg: "Post creado exitosamente",
    data: result.insertedId,
  });
};

// @desc Editar un post
// @route PUT /api/posts/id:
// @access Private
const editPost = async (req, res) => {
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
};

// @desc Borrar un post
// @route DELETE /api/posts/id:
// @access Private
const deletePost = async (req, res) => {
  // const post = await Post.findById(req.params.id);

  // if (!post) {
  //   res.status(400);
  //   throw new Error("Post not found");
  // }

  // await post.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: `Delete post ${req.params.id}` });
  // res.status(200).json({ id: req.params.id });
};

module.exports = {
  listPosts,
  createPost,
  editPost,
  deletePost,
};
