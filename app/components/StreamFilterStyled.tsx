'use client';  // Required: this component uses a hook

import { useState } from 'react';
import './StreamFilter.css';

export default function StreamFilter() {
  // useState(initial value) returns [currentValue, setter]
  const [selected, setSelected] = useState<string>('All');

  const streams = ['All', 'Engineering', 'Data', 'Cyber'];

  return (
    <div className="stream-filter">
      {streams.map((stream) => (
        <button
          key={stream}
          onClick={() => setSelected(stream)}
          className={selected === stream ? 'active' : ''}
          style={{
            fontWeight: selected === stream ? 'bold' : 'normal'
          }}
        >
          {stream}
        </button>
      ))}
      {/* <p>Showing: {selected}</p> */}
    </div>

  );
}
