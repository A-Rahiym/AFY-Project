// StepFormPersonal.jsx
const StepFormPersonal = ({ formData, onChange, errors }) => (
  <>
    <div>
      <label className="block font-medium">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
    </div>
    <div>
      <label className="block font-medium">Level</label>
      <select
        name="level"
        value={formData.level}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="">Select Level</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
      </select>
      {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
    </div>
    <div>
      <label className="block font-medium">Are you an official?</label>
      <select
        name="is_official"
        value={formData.is_official}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    <div>
      <label className="block font-medium">Are you disabled?</label>
      <select
        name="is_disabled"
        value={formData.is_disabled}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  </>
);

export default StepFormPersonal;
