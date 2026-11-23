'use client';  // Required: this component uses a hook

import { useState } from 'react';

export default function StreamFilter() {
  // useState(initial value) returns [currentValue, setter]
  const [selected, setSelected] = useState<string>('All');

  const streams = ['All', 'Engineering', 'Data', 'Cyber'];

  return (
    <div>
      {streams.map((stream) => (
        <button
          key={stream}
          onClick={() => setSelected(stream)}
          className={`px-4 py-2 mr-2 rounded border transition
    ${selected === stream
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
        >
          {stream}
        </button>

      ))}
      <p>Showing: {selected}</p>
    </div>
  );
}
