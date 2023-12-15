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
  } catch (error) {
    console.log("Conexión a MongoDB fallida".red);
  }
}
run().catch(console.dir);

const database = client.db("examenux");
const posts = database.collection("Post");
// Importar el esquema de los posts
const Post = require("../models/postModel");
const { query } = require("express");

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

// @desc Listar todos los posts
// @route GET /api/posts
// @access Private
const listPosts = async (req, res) => {
  // Validar si no hay posts
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
    });
  }
  // Buscar posts registrados en la collection
  const query = posts.find();
  // Guardar cada post en un arreglo
  let arrPosts = [];
  for await (const doc of query) {
    arrPosts.push(doc);
  }
  // Listar los posts
  res.status(200).send({
    documentos: arrPosts,
  });
};

// @desc Editar un post
// @route PUT /api/posts/id:
// @access Private
const editPost = async (req, res) => {
  // Validar si no hay posts
  if ((await posts.countDocuments()) === 0) {
    res.status(200).send({
      msg: "No hay posts guardados",
    });
  }
  // Validar si existe el post con el id recibido
  // if (!posts.findOne({ _id: req.params.id })) {
  //   return res.status(500).send({
  //     msg: `No se encontró ningún post con id ${res.body.id}`,
  //   });
  // }

  // Filtro para buscar el post con el id recibido
  const filter = { _id: req.params.id };
  // Nuevo valor de titulo del post
  const update = { $set: { titulo: req.body.titulo } };
  const options = { upsert: false };

  // Editar el post
  const result = await posts.updateOne(filter, update, options);

  // Print the number of matching and modified documents
  console.log(
    `${result.matchedCount} posts matched the filter, updated ${result.modifiedCount} post(s)`
  );
  // res.status(200).send("Post editado existosamente");
  res
    .status(200)
    .send(
      `${result.matchedCount} posts matched the filter, updated ${result.modifiedCount} post(s)`
    );
};

// @desc Borrar un post
// @route DELETE /api/posts/id:
// @access Private
const deletePost = async (req, res) => {};

module.exports = {
  listPosts,
  createPost,
  editPost,
  deletePost,
};
