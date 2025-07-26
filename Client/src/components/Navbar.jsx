import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Bell } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { student, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/studentLogin");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Hostel Selection", path: "/choose-hostel" },
    { name: "Payment", path: "/payment-status" },
    { name: "FAQ", path: "/faq" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-[#042b50] text-white h-16 px-8 flex items-center justify-between relative">
      <div className="text-white font-semibold text-sm">
        ABU Accommodation Portal
      </div>
      <ul className="flex items-center space-x-6">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`py-2 px-3 rounded ${
              location.pathname === item.path ? "bg-[#0084ff] font-bold" : ""
            }`}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}

        <li>
          <Bell className="text-yellow-400 w-5 h-5" />
        </li>
        <li className="text-white font-semibold text-sm">
          {student?.fullName || student?.name || "Student"}
        </li>
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gray-400" />
          </button>

          {/* Dropdown with animation */}
          <div
            className={`absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 origin-top-right transition-all duration-200 transform z-50 ${
              isDropdownOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 transition"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
