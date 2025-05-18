// src/app.js
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// Import other route files as needed

const app = express();


app.get('/', (req, res) => {
  res.send('AFY project');
});


app.use(express.json());


app.use('/api/students', studentRoutes);
// Register routes
// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);
// Register other routes as needed

export default app;
