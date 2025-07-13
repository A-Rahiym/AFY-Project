// StepFormAcademic.jsx
const StepFormAcademic = ({ formData, onChange, errors, faculties, departments }) => (
  <>
    <div>
      <label className="block font-medium">Faculty</label>
      <select
        name="faculty"
        value={formData.faculty}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="">Select Faculty</option>
        {faculties.map((faculty) => (
          <option key={faculty} value={faculty}>{faculty}</option>
        ))}
      </select>
      {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty}</p>}
    </div>
    <div>
      <label className="block font-medium">Department</label>
      <select
        name="department"
        value={formData.department}
        onChange={onChange}
        disabled={!formData.faculty}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
      {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
    </div>
    <div>
      <label className="block font-medium">Campus</label>
      <select
        name="campus"
        value={formData.campus}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="">Select Campus</option>
        <option value="samaru">Samaru</option>
        <option value="shika">Shika</option>
        <option value="kongo">Kongo</option>
      </select>
      {errors.campus && <p className="text-red-500 text-sm">{errors.campus}</p>}
    </div>
    <div>
      <label className="block font-medium">Student Type</label>
      <select
        name="student_type"
        value={formData.student_type}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded"
      >
        <option value="undergraduate">Undergraduate</option>
        <option value="postgraduate">Postgraduate</option>
      </select>
      {errors.student_type && <p className="text-red-500 text-sm">{errors.student_type}</p>}
    </div>
  </>
);

export default StepFormAcademic;