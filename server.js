require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const { authenticate } = require("./middlewares/auth");

// Auth Routes
app.use("/api/auth", authRoutes);

// Protected Route Example
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "This is a protected route!" });
});

// Routes
const todoRouter = require("./routes/todo-router");
app.use("/api/todos/", todoRouter);
app.get("/", (req, res) => {
  res.send("Todo API is running!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
