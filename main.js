const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoModel = require('./Models/todopro.js');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGOURL + 'taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(" MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.post('/add', async (req, res) => {
  try {
    const newTask = req.body.NameofTheTask;
    const task = await todoModel.create({ Task: newTask });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/get', async (req, res) => {
  try {
    const tasks = await todoModel.find({});
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/del/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await todoModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Task } = req.body;  // frontend sends { Task: "new name" }

    const updated = await todoModel.findByIdAndUpdate(
      id,
      { Task },
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully", updated });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
