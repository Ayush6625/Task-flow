const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const db = require('../db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'MEMBER']).default('MEMBER')
});

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    
    db.get("SELECT * FROM users WHERE email = ?", [data.email], async (err, row) => {
      if (err) return next(err);
      if (row) return res.status(400).json({ error: 'Email already in use' });
      
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      db.run(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [data.name, data.email, hashedPassword, data.role],
        function (err) {
          if (err) return next(err);
          const userId = this.lastID;
          const token = jwt.sign({ id: userId, role: data.role }, JWT_SECRET, { expiresIn: '1d' });
          res.status(201).json({ token, user: { id: userId, name: data.name, email: data.email, role: data.role } });
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    
    db.get("SELECT * FROM users WHERE email = ?", [data.email], async (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
      
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

module.exports = router;
