const FormSuccessMessage = ({ navigate }) => (
  <div className="text-center p-12">
    <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful ✅</h2>
    <p className="mb-6">Your account has been created successfully.</p>
    <div className="flex justify-center gap-4">
      <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-900 text-white rounded">
        Back to Home
      </button>
      <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-green-600 text-white rounded">
        Go to Dashboard
      </button>
    </div>
  </div>
);

export default FormSuccessMessage;
