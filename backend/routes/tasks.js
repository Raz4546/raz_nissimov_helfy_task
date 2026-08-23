const express = require('express');

const router = express.Router();

const tasks = [];
let nextId = 1;
const PRIORITIES = ["low", "medium", "high"];

router.get("/", (req, res) => {
    res.json(tasks);
})

router.post('/', (req, res) => {
    const { title, description, priority } = req.body ?? {}

    if (!title?.trim() || !description?.trim() || !priority) {
        return res.status(400).json({
            message: "Missing required parameters"
        })
    }

    if (!PRIORITIES.includes(priority)) {
        return res.status(400).json({
            message: "Invalid priority"
        });
    }

    const task = {
        id: nextId++,
        title,
        description,
        priority,
        completed: false,
        createdAt: new Date(),
    }

    tasks.push(task)

    return res.status(201).json({ message: 'Task created successfully', data: task})
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, description, priority } = req.body;

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
        message: "Task not found"
        });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
        message: "No fields provided for update"
        });
    }

    if (priority !== undefined && !PRIORITIES.includes(priority)) {
        return res.status(400).json({
        message: "Invalid priority"
        });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (description !== undefined) {
        task.description = description;
    }

    if (priority !== undefined) {
        task.priority = priority;
    }

    return res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(taskIndex, 1);

  return res.status(204).send();
});

router.patch("/:id/toggle", (req,res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({
        message: "Task not found"
        });
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    return res.status(200).json(tasks[taskIndex])
})

module.exports = router;