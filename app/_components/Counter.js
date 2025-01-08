'use client';

import { useState } from 'react';

export default function Counter({ data }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <p>There are {data.length} users at the moment</p>
    </>
  );
}
