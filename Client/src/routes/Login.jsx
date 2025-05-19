import React, { useState } from 'react';
import { loginStudent } from '../api/studentApi';

const Login = () => {
  const [form, setForm] = useState({ reg_number: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');
    try {
      const res = await loginStudent(form);
      if (res?.token) {
        localStorage.setItem('token', res.token);
        setMessage('✅ Login successful!');
      } else {
        setMessage('❌ Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Student Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Registration Number</label>
          <input
            type="text"
            name="reg_number"
            value={form.reg_number}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>

      {message && (
        <p className={`mt-6 text-center text-lg font-semibold ${message.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
