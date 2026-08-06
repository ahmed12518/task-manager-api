const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let currentId = 1;

// Create Task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = {
    id: currentId++,
    title,
    description: description || "",
    status: status || "pending",
    created_at: new Date(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get Task By ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  task.title = title;
  task.description = description || "";
  task.status = status || task.status;

  res.json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});