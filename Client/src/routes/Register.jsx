import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import { registerStudent } from '../api/studentApi';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import faculties from '../data/faculties.json';
import departmentsData from '../data/departments.json';

const Register = () => {
  const navigate = useNavigate(); // ✅ create navigate function

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
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'faculty' ? { department: '' } : {}),
    }));
  };

  useEffect(() => {
    if (formData.faculty) {
      setDepartments(departmentsData[formData.faculty] || []);
    } else {
      setDepartments([]);
    }
  }, [formData.faculty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      const res = await registerStudent(formData);
      setMessage('✅ Registered successfully!');
      console.log(res);

      // ✅ Redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  const genderOptions = ['Male', 'Female'];
  const levelOptions = ['100', '200', '300', '400', '500'];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} />
        <TextInput label="Reg Number" name="reg_number" value={formData.reg_number} onChange={handleChange} />
        <SelectInput label="Faculty" name="faculty" value={formData.faculty} onChange={handleChange} options={faculties} />
        <SelectInput label="Department" name="department" value={formData.department} onChange={handleChange} options={departments} />
        <SelectInput label="Level" name="level" value={formData.level} onChange={handleChange} options={levelOptions} />
        <SelectInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={genderOptions} />
        <TextInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

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
};

export default Register;
