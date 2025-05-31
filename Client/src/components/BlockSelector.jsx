import React from 'react';

const BlockSelector = ({ selectedBlockId, onBlockChange, blocks, disabled }) => {
  const handleChange = (e) => {
    onBlockChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="blockSelect" className="block text-lg font-medium text-gray-700 mb-2">
        Select Block:
      </label>
      <select
        id="blockSelect"
        value={selectedBlockId}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={disabled}
      >
        <option value="">-- Choose a Block --</option>
        {blocks.map(block => (
          <option key={block.id} value={block.id}>
            {block.name.replace(/_/g, ' ').toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BlockSelector;
