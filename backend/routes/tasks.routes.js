const express = require('express');
const { z } = require('zod');
const db = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const taskSchema = z.object({
  title: z.string().min(2),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
  priority: z.enum(['LOW', 'NORMAL', 'URGENT']).default('NORMAL'),
  projectId: z.number(),
  assigneeId: z.number().optional()
});

const taskUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'URGENT']).optional(),
  assigneeId: z.number().optional()
});

router.use(authenticate);

// Get all tasks (can filter by projectId)
router.get('/', (req, res, next) => {
  const { projectId } = req.query;
  
  let query = "SELECT * FROM tasks";
  const params = [];
  
  if (projectId) {
    query += " WHERE projectId = ?";
    params.push(parseInt(projectId));
  }

  db.all(query, params, (err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});

// Create a task
router.post('/', (req, res, next) => {
  try {
    const data = taskSchema.parse(req.body);
    
    db.get("SELECT * FROM projects WHERE id = ?", [data.projectId], (err, project) => {
      if (err) return next(err);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      
      db.run(
        "INSERT INTO tasks (title, status, priority, projectId, assigneeId) VALUES (?, ?, ?, ?, ?)",
        [data.title, data.status, data.priority, data.projectId, data.assigneeId || null],
        function (err) {
          if (err) return next(err);
          res.status(201).json({ id: this.lastID, ...data });
        }
      );
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Update a task
router.patch('/:id', (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const data = taskUpdateSchema.parse(req.body);
    
    db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, task) => {
      if (err) return next(err);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      
      const newStatus = data.status || task.status;
      const newPriority = data.priority || task.priority;
      const newAssigneeId = data.assigneeId !== undefined ? data.assigneeId : task.assigneeId;
      
      db.run(
        "UPDATE tasks SET status = ?, priority = ?, assigneeId = ? WHERE id = ?",
        [newStatus, newPriority, newAssigneeId, taskId],
        function (err) {
          if (err) return next(err);
          res.json({ id: taskId, status: newStatus, priority: newPriority, assigneeId: newAssigneeId });
        }
      );
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

module.exports = router;
