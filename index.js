const express = require("express");
const app = express();

const sequelize = require("./database");
const Task = require("./models/Task");

app.use(express.json());

// Create Task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Task By ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    await task.update({
      title,
      description,
      status,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تشغيل قاعدة البيانات ثم السيرفر
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
