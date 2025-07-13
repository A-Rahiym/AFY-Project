// // 🧠 GOAL: Rebuild the multi-step wizard manually (no broken packages)
// // Using Tailwind CSS and React state for full control and clean styling

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerStudent } from "../api/studentApi";
// import TextInput from "../components/TextInput";
// import SelectInput from "../components/SelectInput";
// import faculties from "../data/faculties.json";
// import departmentsData from "../data/departments.json";

// const steps = ["Account", "Academics", "Personal", "Review"];

// const Register = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);

//   const [formData, setFormData] = useState({
//     name: "",
//     reg_number: "",
//     email: "",
//     faculty: "",
//     department: "",
//     level: "",
//     gender: "",
//     password: "",
//     confirmPassword: "",
//     student_type: "undergraduate",
//     campus: "",
//     is_official: "No",
//     is_disabled: "No",
//   });

//   const [departments, setDepartments] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const genderOptions = ["Male", "Female"];
//   const levelOptions = ["100", "200", "300", "400", "500"];
//   const studentTypeOptions = ["undergraduate", "postgraduate"];
//   const studentCampuses = ["samaru", "shika", "kongo"];
//   const yesNoOptions = ["Yes", "No"];

//   useEffect(() => {
//     setDepartments(formData.faculty ? departmentsData[formData.faculty] || [] : []);
//   }, [formData.faculty]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "faculty" ? { department: "" } : {}),
//     }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const renderInput = (label, name, type = "text", required = false) => (
//     <TextInput
//       label={label}
//       name={name}
//       type={type}
//       value={formData[name]}
//       onChange={handleChange}
//       required={required}
//       error={errors[name]}
//       className="bg-blue-100 rounded-md px-4 py-2 w-full"
//     />
//   );

//   const renderSelect = (label, name, options, required = false, disabled = false) => (
//     <SelectInput
//       label={label}
//       name={name}
//       value={formData[name]}
//       onChange={handleChange}
//       options={options}
//       required={required}
//       disabled={disabled}
//       error={errors[name]}
//       className="bg-blue-100 rounded-md px-4 py-2 w-full"
//     />
//   );

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
//   };
//   const handlePrevious = () => {
//     if (currentStep > 0) setCurrentStep((prev) => prev - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = {
//       ...formData,
//       is_official: formData.is_official === "Yes",
//       is_disabled: formData.is_disabled === "Yes",
//     };
//     console.log(dataToSend);
//     delete dataToSend.confirmPassword;

//     try {
//       await registerStudent(dataToSend);
//       setSuccess(true);
//     } catch (err) {
//       setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
//     }
//   };

//   const Stepper = () => (
//     <div className="flex justify-center space-x-6 mb-8">
//       {steps.map((label, index) => (
//         <div key={index} className="flex flex-col items-center">
//           <div
//             className={`rounded-full w-8 h-8 flex items-center justify-center text-sm border-2 ${
//               index === currentStep ? "border-black" : "border-gray-300"
//             }`}
//           >
//             {index + 1}
//           </div>
//           <span className="text-xs mt-1">{label}</span>
//         </div>
//       ))}
//     </div>
//   );

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <>
//             {renderInput("Full Name", "name", "text", true)}
//             {renderInput("Registration Number", "reg_number", "text", true)}
//             {renderInput("Password", "password", "password", true)}
//             {renderInput("Confirm Password", "confirmPassword", "password", true)}
//           </>
//         );
//       case 1:
//         return (
//           <>
//             {renderSelect("Faculty", "faculty", faculties, true)}
//             {renderSelect("Department", "department", departments, true, !formData.faculty)}
//             {renderSelect("Campus", "campus", studentCampuses, true)}
//           </>
//         );
//       case 2:
//         return (
//           <>
//             {renderSelect("Gender", "gender", genderOptions, true)}
//             {renderSelect("Level", "level", levelOptions, true)}
//             {renderSelect("Student Representative", "is_official", yesNoOptions, true)}
//             {renderSelect("Do you have any accessibility needs?", "is_disabled", yesNoOptions, true)}
//           </>
//         );
//       case 3:
//         return (
//           <div className="bg-gray-50 p-4 rounded space-y-2">
//             {Object.entries(formData).map(([key, val]) => {
//               if (["password", "confirmPassword"].includes(key)) return null;
//               const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
//               return (
//                 <p key={key}>
//                   <strong>{label}:</strong> {val || "N/A"}
//                 </p>
//               );
//             })}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (success) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center">
//         <h2 className="text-2xl font-semibold mb-2">Your account has been created successfully.</h2>
//         <p>You can now log in and begin your accommodation process.</p>
//         <div className="mt-6 flex gap-4">
//           <button className="bg-blue-900 text-white px-6 py-2 rounded">Back to Home</button>
//           <button className="bg-blue-900 text-white px-6 py-2 rounded">Go to Dashboard</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white min-h-screen">
//       <Stepper />
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 gap-4">{renderStep()}</div>
//         <div className="flex justify-between mt-6">
//           {currentStep > 0 && (
//             <button
//               type="button"
//               onClick={handlePrevious}
//               className="px-4 py-2 bg-blue-900 text-white rounded"
//             >
//               Prev
//             </button>
//           )}
//           {currentStep < steps.length - 1 ? (
//             <button
//               type="button"
//               onClick={handleNext}
//               className="ml-auto px-4 py-2 bg-blue-900 text-white rounded"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="ml-auto px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Register
//             </button>
//           )}
//         </div>
//       </form>
//       {message && (
//         <p className="mt-4 text-center text-red-500 font-semibold">{message}</p>
//       )}
//     </div>
//   );
// };

// export default Register;




// RegisterForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../api/studentApi";
import StepFormAccount from "../components/Register/StepFormAccount";
import StepFormAcademic from "../components/Register/StepFormAcademics";
import StepFormPersonal from "../components/Register/StepFormPersonal";
import StepFormReview from "../components/Register/StepFormReview";
import StepperIndicator from "../components/Register/StepperIndicator";
import FormSuccessMessage from "../components/Register/FormSuccessMessage";
import faculties from "../data/faculties.json";
import departmentsData from "../data/departments.json";

const steps = ["Account", "Academics", "Personal", "Review"];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    reg_number: "",
    email: "",
    faculty: "",
    department: "",
    level: "",
    gender: "",
    password: "",
    confirmPassword: "",
    student_type: "undergraduate",
    campus: "",
    is_official: "No",
    is_disabled: "No",
  });

  useEffect(() => {
    setDepartments(formData.faculty ? departmentsData[formData.faculty] || [] : []);
  }, [formData.faculty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "faculty" ? { department: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      is_official: formData.is_official === "Yes",
      is_disabled: formData.is_disabled === "Yes",
    };
    delete dataToSend.confirmPassword;
    console.log(dataToSend);
    try {
      await registerStudent(dataToSend);
      setSuccess(true);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const renderStep = () => {
    const stepProps = { formData, onChange: handleChange, errors, departments };
    switch (currentStep) {
      case 0:
        return <StepFormAccount {...stepProps} />;
      case 1:
        return <StepFormAcademic {...stepProps} faculties={faculties} />;
      case 2:
        return <StepFormPersonal {...stepProps} />;
      case 3:
        return <StepFormReview formData={formData} />;
      default:
        return null;
    }
  };

  if (success) return <FormSuccessMessage navigate={navigate} />;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white min-h-screen">
      <StepperIndicator steps={steps} currentStep={currentStep} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">{renderStep()}</div>
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-900 text-white rounded"
            >
              Prev
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 bg-blue-900 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded"
            >
              Register
            </button>
          )}
        </div>
      </form>
      {message && (
        <p className="mt-4 text-center text-red-500 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default RegisterForm;
