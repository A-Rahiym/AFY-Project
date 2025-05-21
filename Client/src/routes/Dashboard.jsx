// pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: '💳 Payment Status',
      description: 'Check your current payment status and history.',
      route: '/payment-status',
    },
    {
      title: '👤 View Profile',
      description: 'See and update your personal and academic details.',
      route: '/profile',
    },
    {
      title: '🏠 Select Accommodation',
      description: 'Choose your preferred accommodation option.',
      route: '/select-accommodation',
    },
  ];
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">🎓 Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-blue-100 hover:bg-blue-200 transition duration-300 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
