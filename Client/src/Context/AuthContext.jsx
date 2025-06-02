// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getStudentProfile } from '../api/studentApi'; // Make sure this path is correct

// Create the context
export const AuthContext = createContext({
  studentId: null,
  token: null,
  studentProfile: null, // Will store the fetched profile
  setStudentProfile: () => {}, // Function to update profile
  isAuthenticated: false,
  isAuthLoading: true, // To indicate if auth status is being checked
  login: () => {}, // Placeholder for a login function (to be implemented later)
  logout: () => {}, // Placeholder for a logout function (to be implemented later)
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);
  const [token, setToken] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Effect to load authentication data and student profile from localStorage on app mount
  useEffect(() => {
    const loadAuthData = async () => {
      const storedStudentId = localStorage.getItem('studentId');
      const storedToken = localStorage.getItem('token');

      if (storedStudentId && storedToken) {
        setStudentId(storedStudentId);
        setToken(storedToken);
        setIsAuthenticated(true); // Tentatively set as authenticated
        try {
          // Fetch student profile only if token and studentId exist
          const profile = await getStudentProfile(storedStudentId, storedToken);
          setStudentProfile(profile);
          console.log("Student Profile loaded into context:", profile); // Debugging
        } catch (error) {
          console.error("Failed to fetch student profile for context:", error);
          // If profile fetch fails, token might be invalid/expired, so clear auth data
          localStorage.removeItem('studentId');
          localStorage.removeItem('token');
          setStudentId(null);
          setToken(null);
          setStudentProfile(null);
          setIsAuthenticated(false);
        }
      }
      setIsAuthLoading(false); // Authentication check is complete
    };

    loadAuthData();
  }, []); // Run only once on component mount

  // Placeholder functions for login/logout (you'll integrate your actual login/logout logic here)
  const login = (id, newToken) => {
    localStorage.setItem('studentId', id);
    localStorage.setItem('token', newToken);
    setStudentId(id);
    setToken(newToken);
    setIsAuthenticated(true);
    // You might want to refetch profile here or let the useEffect handle it on next render
    // For immediate profile update, you can call getStudentProfile here
  };

  const logout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('token');
    setStudentId(null);
    setToken(null);
    setStudentProfile(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    studentId,
    token,
    studentProfile,
    setStudentProfile, // Allow components to update profile if needed (e.g., after an edit)
    isAuthenticated,
    isAuthLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier consumption of the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};