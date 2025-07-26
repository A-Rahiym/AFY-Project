// src/components/ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#007BFF] text-white p-6 rounded-lg w-full max-w-sm mx-4 shadow-lg text-center">
        <h2 className="text-xl font-bold mb-2">WARNING!</h2>
        <p className="text-sm mb-6">This process cannot be reversed</p>

        <button
          onClick={onConfirm}
          className="bg-white text-[#007BFF] font-semibold px-4 py-2 rounded-md mb-3 w-full hover:bg-gray-100 transition"
        >
          I understand
        </button>

        <button
          onClick={onCancel}
          className="text-white underline text-sm hover:text-gray-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
