// StepperIndicator.jsx
const StepperIndicator = ({ steps, currentStep }) => (
  <div className="flex justify-between mb-6">
    {steps.map((step, idx) => (
      <div key={idx} className="flex-1 text-center">
        <div
          className={`w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center mb-1 ${
            idx === currentStep ? "bg-blue-700" : "bg-gray-300"
          }`}
        >
          {idx + 1}
        </div>
        <p className={`${idx === currentStep ? "text-blue-700 font-semibold" : "text-gray-500"}`}>{step}</p>
      </div>
    ))}
  </div>
);

export default StepperIndicator;