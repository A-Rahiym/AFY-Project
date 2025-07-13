// StepFormReview.jsx
const StepFormReview = ({ formData }) => {
  const fields = Object.entries(formData).filter(
    ([key]) => key !== "password" && key !== "confirmPassword"
  );

  return (
    <div className="bg-gray-100 p-4 rounded">
      {fields.map(([key, value]) => (
        <p key={key} className="capitalize">
          <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
        </p>
      ))}
    </div>
  );
};

export default StepFormReview;
