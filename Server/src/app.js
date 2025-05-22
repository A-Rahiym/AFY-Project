// src/app.js
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import hostelRoutes from './routes/hostelRoutes.js';
import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// Import other route files as needed

const app = express();


app.get('/', (req, res) => {
  res.send('AFY project');
});

// CORS config
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true, // Allow credentials like cookies and headers
  })
);
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/hostels', hostelRoutes);
// Register routes
// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);
// Register other routes as needed

export default app;
