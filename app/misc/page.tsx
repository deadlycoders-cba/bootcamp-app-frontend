'use client';

import { useState } from 'react';

export default function AccessibilityExample() {
  const [name, setName] = useState('');

  const save = () => {
    alert("Saved!");
  };

  return (
    <article>
      <button onClick={save}>
        Save
      </button>
      <form>
        <label htmlFor="name">Your name</label>  {/* htmlFor not for */}
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
        />
        <button type="submit">Submit</button>  {/* Always use <button> not <div> */}
      </form>
    </article>

  );
}