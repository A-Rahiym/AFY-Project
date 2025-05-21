// components/TextInput.js
const TextInput = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2 capitalize">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default TextInput;
