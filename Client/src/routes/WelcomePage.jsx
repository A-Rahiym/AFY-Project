// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleStaffClick = () => {
        navigate('/admin/login'); // Navigate to the admin login page
    };

    const handleStudentClick = () => {
        navigate('/studentLogin'); // Navigate to the student login page (your renamed Login.jsx)
    };

    return (
        <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
                {/* Left Section: Welcome Text */}
                <div className="text-white text-center md:text-left mb-8 md:mb-0 md:w-1/2 p-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                        Welcome to the
                    </h1>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                        Ahmadu Bello University Zaria
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                        Accommodation Portal
                    </p>
                </div>

                {/* Vertical Separator Line (visible on medium and larger screens) */}
                <div className="hidden md:block h-64 w-px bg-white mx-8 lg:mx-16"></div>

                {/* Right Section: Role Selection Buttons */}
                <div className="flex flex-col items-center md:items-start md:w-1/2 p-4">
                    <p className="text-white text-lg md:text-xl mb-6">Are you a...</p>
                    <div className="space-y-4 w-full max-w-xs">
                        <button
                            onClick={handleStaffClick}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Staff
                        </button>
                        <p className="text-white text-center text-sm my-2">Or</p>
                        <button
                            onClick={handleStudentClick}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Student
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;