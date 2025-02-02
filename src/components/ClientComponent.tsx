'use client';

import { useState } from 'react';

interface ClientComponentProps {
  initialCount?: number;
}

export default function ClientComponent({ initialCount = 0 }: ClientComponentProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
      <p className="text-lg mb-4">Contador: {count}</p>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Incrementar
      </button>
    </div>
  );
} 