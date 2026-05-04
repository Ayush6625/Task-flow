TaskFlow – Team Task Manager Web App

A full-stack Task Management & Collaboration Platform that allows users to create projects, assign tasks, and track progress with role-based access (Admin/Member).

 Overview

TaskFlow is designed to simplify project management and team collaboration.
It provides a clean interface to manage tasks, monitor progress, and organise workflows efficiently.

Such applications typically include task creation, status tracking, and user authentication to improve productivity and workflow management.

 Features
🔐 Authentication & Authorisation
User Signup & Login
JWT-based authentication
Role-based access (Admin / Member)
📁 Project Management
Create & manage projects
Add/remove team members
Project-wise task organisation
✅ Task Management
Create, update, delete tasks
Assign tasks to users
Task status tracking:
To Do
In Progress
Completed
Set deadlines & priorities
📊 Dashboard
Overview of all tasks
Status-wise task distribution
Overdue task tracking
User-specific task view
🎨 UI/UX
Responsive design (mobile + desktop)
Clean dashboard layout
Easy navigation
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS / CSS
Axios
Backend
Node.js
Express.js
Database
MongoDB (Mongoose)
Authentication
JWT (JSON Web Token)
bcrypt (password hashing)

Project Structure
TaskFlow/
│
├── client/                # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── server/                # Backend (Node + Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│
├── .env
├── package.json
└── README.md
