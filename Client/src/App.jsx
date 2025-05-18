// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './routes/Register';
import Login from './routes/Login';
import PaymentStatus from './routes/PaymentStatus';
import AccommodationSelection from './routes/AccomodationSelection';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/select-accommodation" element={<AccommodationSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
