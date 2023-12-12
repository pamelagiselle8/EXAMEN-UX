const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// Esta linea hace la misma funcion que estas
// router.get("/", getGoals);
// router.post("/", createGoals);
router.route("/").get(getGoals).post(createGoals);

// Esta linea hace la misma funcion que estas
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
