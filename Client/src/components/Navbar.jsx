import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student Accommodation Portal</h1>

        <ul className="flex items-center gap-6">
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/payment-status" className="hover:underline">
              Payment Status
            </Link>
          </li>
          <li>
            <Link to="/select-accommodation" className="hover:underline">
              Accommodation
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
