// components/atoms/AddButton.tsx
'use client'
import React from 'react';

const AddButton = () => {
  return (
    <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
      + Add
    </button>
  );
};

export default AddButton;