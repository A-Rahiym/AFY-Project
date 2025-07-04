// src/components/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../api/studentApi";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import faculties from "../data/faculties.json";
import departmentsData from "../data/departments.json";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    reg_number: "",
    department: "",
    faculty: "",
    level: "",
    gender: "",
    password: "",
    student_type: "undergraduate", // Default value
    campus: "",
    is_official: "No", // Default string value for select input
    is_disabled: "No", // Default string value for select input
  });

  const [message, setMessage] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset department if faculty changes
      ...(name === "faculty" ? { department: "" } : {}),
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
    setMessage("Submitting...");

    // Prepare data for backend, converting string booleans to actual booleans
    const dataToSend = {
      ...formData,
      is_official: formData.is_official === "Yes", // Convert 'Yes' to true, 'No' to false
      is_disabled: formData.is_disabled === "Yes", // Convert 'Yes' to true, 'No' to false
    };

    console.log("Form Data to Send:", dataToSend);

    try {
      const res = await registerStudent(dataToSend); // Send the converted data
      setMessage("✅ Registered successfully!");
      console.log(res);

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`); // More specific error message
    }
  };

  const genderOptions = ["Male", "Female"];
  const levelOptions = ["100", "200", "300", "400", "500"];
  const studentTypeOptions = ["undergraduate", "postgraduate"];
  const studentCampuses = ["samaru", "shika", "kongo"];
  const yesNoOptions = ["Yes", "No"]; // For is_official and is_disabled

return (
  <div className="max-w-4xl mx-auto p-4 my-auto bg-white rounded-lg shadow-lg">
    <h2 className="text-lg font-medium mb-3 text-center">
      Student Registration
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            label="Reg Number"
            name="reg_number"
            value={formData.reg_number}
            onChange={handleChange}
          />
          <SelectInput
            label="Faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            options={faculties}
          />
          <SelectInput
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={departments}
          />
          <SelectInput
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            options={levelOptions}
          />
          <SelectInput
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
          />
        </div>

        <div className="space-y-2">
          <SelectInput
            label="Campus"
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            options={studentCampuses}
          />
          <SelectInput
            label="Student Type"
            name="student_type"
            value={formData.student_type}
            onChange={handleChange}
            options={studentTypeOptions}
          />
          <SelectInput
            label="Are you an official for an organization?"
            name="is_official"
            value={formData.is_official}
            onChange={handleChange}
            options={yesNoOptions}
          />
          <SelectInput
            label="Are you disabled?"
            name="is_disabled"
            value={formData.is_disabled}
            onChange={handleChange}
            options={yesNoOptions}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Register
      </button>
    </form>
    {message && (
      <p
        className={`mt-4 text-center text-sm font-semibold ${
          message.startsWith("❌") ? "text-red-500" : "text-green-500"
        }`}
      >
        {message}
      </p>
    )}
  </div>
);
};

export default Register;
