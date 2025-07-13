// StepFormAccount.jsx
const StepFormAccount = ({ formData, onChange, errors }) => (
  <>
    <div>
      <label className="block font-medium">Full Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </div>
    <div>
      <label className="block font-medium">Reg Number</label>
      <input
        type="text"
        name="reg_number"
        value={formData.reg_number}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {errors.reg_number && <p className="text-red-500 text-sm">{errors.reg_number}</p>}
    </div>
    <div>
      <label className="block font-medium">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
    </div>
    <div>
      <label className="block font-medium">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}
    </div>
  </>
);

export default StepFormAccount;