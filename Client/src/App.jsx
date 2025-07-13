import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './routes/Register';
import Login from './routes/Login';
import PaymentStatus from './routes/PaymentStatus';
import WelcomePage from './routes/WelcomePage';
import ViewProfile from './routes/Profile';
import Navbar from './components/Navbar';
import Dashboard from './routes/Dashboard';
import AccommodationPayment from './routes/AccomodationPayment';
import HostelAndRoomBooking from './routes/HostelAndRoomBooking';
import HostelChoicePage from './routes/HostelChoicePage';
import AdminHostelAssignment from './routes/AdminHostelAssignment';
import { AuthProvider } from './Context/AuthContext';

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
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentLogin" element={<Login />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/book-room" element={<HostelAndRoomBooking/>} />
        <Route path="/accommodation-payment" element={<AccommodationPayment />} />
         <Route path="/choose-hostel" element={<HostelChoicePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-assignment" element={<AdminHostelAssignment />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
    <AppContent />
    </AuthProvider>
  </Router>
);


export default App;