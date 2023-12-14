const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHqlBtWHDSBncB39wKK_cBlodi4oOiO9M",
  authDomain: "examenux-c9f86.firebaseapp.com",
  projectId: "examenux-c9f86",
  storageBucket: "examenux-c9f86.appspot.com",
  messagingSenderId: "813028450508",
  appId: "1:813028450508:web:d8fb6bd423467db8306269",
  measurementId: "G-0G5NK2E3W3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// @desc Crear un usuario
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send({
        msg: "Usuario creado exitosamente",
        data: userCredential,
      });
    })
    .catch((error) => {
      res.status(500).send({
        msg: "No se pudo crear el usuario",
        data: error.message,
      });
    });

  // res.json({ message: "Create user" });
};

// @desc Login
// @route POST /api/login
// @access Public
const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send({
        msg: "Creado exitosamente",
        data: userCredential,
      });
    })
    .catch((error) => {
      res.status(500).send({
        msg: "No se pudo crear el usuario",
        data: error.message,
      });
    });
  // res.json({ message: "Login user" });
};

// @desc Crear un usuario
// @route POST /api/users
// @access Public
const logoutUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  signOut(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send({
        msg: "Creado exitosamente",
        data: userCredential,
      });
    })
    .catch((error) => {
      res.status(500).send({
        msg: "No se pudo crear el usuario",
        data: error.message,
      });
    });
  // res.json({ message: "Logout user" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
