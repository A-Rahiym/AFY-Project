import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 shadow-md">
    <div className=' flex justify-between items-center'>
    <h1>Student Accommodation Portal</h1>
      <ul className="flex gap-6">
        <li>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
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
      </ul>
    </div>
    </nav>
  );
};

export default Navbar;
