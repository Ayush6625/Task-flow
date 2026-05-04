const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'taskflow.db');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'MEMBER'
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        ownerId INTEGER,
        FOREIGN KEY(ownerId) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'PENDING',
        priority TEXT DEFAULT 'NORMAL',
        projectId INTEGER,
        assigneeId INTEGER,
        FOREIGN KEY(projectId) REFERENCES projects(id),
        FOREIGN KEY(assigneeId) REFERENCES users(id)
      )
    `);
    
    console.log("Database initialized successfully!");
  });
};

initDb();

module.exports = db;
