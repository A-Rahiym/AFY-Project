import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './routes/Register';
import Login from './routes/Login';
import PaymentStatus from './routes/PaymentStatus';
import AccommodationSelection from './routes/AccomodationSelection';
import ViewProfile from './routes/Profile';
import Navbar from './components/Navbar';
import Dashboard from './routes/Dashboard';
import HostelAndRoomBooking from './routes/HostelAndRoomBooking';

const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]); // re-check token on every route change
  return (
    <div className="App">
      {/* ✅ Show Navbar only if user is authenticated */}
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/book-room" element={<HostelAndRoomBooking/>} />
        <Route path="/select-accommodation" element={<AccommodationSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};
const App = () => (
  <Router>
    <AppContent />
  </Router>
);


export default App;