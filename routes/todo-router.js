const express = require("express");
const todoController = require("../controllers/todo-controller");

const router = express.Router();

// Get all todos
router.get("/", todoController.getTodos);

// Get a single todo by ID
router.get("/:id", todoController.getTodoById);

// Create a new todo
router.post("/", todoController.createTodo);

// Update a todo by ID
router.patch("/:id", todoController.updateTodo);

// Delete a todo by ID
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
