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
          style={{
            fontWeight: selected === stream ? 'bold' : 'normal'
          }}
        >
          {stream}
        </button>
      ))}
      <p>Showing: {selected}</p>
    </div>
  );
}
