import { useState } from 'react';
import { registerStudent } from '../api/studentApi';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    reg_number: '',
    department: '',
    faculty: '',
    level: '',
    gender: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      const res = await registerStudent(formData);
      setMessage('✅ Registered successfully!');
      console.log(res);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'reg_number', 'department', 'faculty', 'level', 'gender', 'password'].map((field) => (
          <div key={field} className="mb-6">
            <label className="block text-lg font-medium mb-2 capitalize">{field.replace('_', ' ')}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
      {message && (
        <p className={`mt-6 text-center text-lg font-semibold ${message.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
