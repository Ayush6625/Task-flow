const express = require('express');
const { z } = require('zod');
const db = require('../db');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

const projectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional()
});

router.use(authenticate);

// Get all projects
router.get('/', (req, res, next) => {
  db.all("SELECT * FROM projects", [], (err, projects) => {
    if (err) return next(err);
    res.json(projects);
  });
});

// Create a project (Admin only)
router.post('/', requireRole(['ADMIN']), (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    
    db.run(
      "INSERT INTO projects (name, description, ownerId) VALUES (?, ?, ?)",
      [data.name, data.description || '', req.user.id],
      function (err) {
        if (err) return next(err);
        res.status(201).json({ id: this.lastID, ...data, ownerId: req.user.id });
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

module.exports = router;
