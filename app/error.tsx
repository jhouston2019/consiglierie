'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-primary border border-border rounded">
        <h2 className="text-xl font-bold mb-4">System Error</h2>
        <p className="text-gray-400 mb-6">
          An error occurred while processing your request.
        </p>
        <button
          onClick={reset}
          className="w-full py-2 bg-accent hover:bg-opacity-80 border border-border rounded font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
