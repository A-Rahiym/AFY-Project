// components/SelectInput.js
const SelectInput = ({ label, name, value, onChange, options }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2 capitalize">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
export default SelectInput;