import React, { useState } from 'react';

export default function DateRangePicker({ onSelect, onClose }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = () => {
    if (start && end) {
      onSelect({ start, end });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4 text-black">📅 Select Date Range</h2>
        <div className="flex flex-col gap-4">
          <input type="date" className="border p-2 rounded text-black" value={start} onChange={(e) => setStart(e.target.value)} />
          <input type="date" className="border p-2 rounded text-black" value={end} onChange={(e) => setEnd(e.target.value)} />
          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Confirm</button>
            <button onClick={onClose} className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
