import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-primary border border-border rounded text-center">
        <h2 className="text-2xl font-bold mb-4">404</h2>
        <p className="text-gray-400 mb-6">Page not found</p>
        <Link
          href="/console"
          className="inline-block px-6 py-2 bg-accent hover:bg-opacity-80 border border-border rounded font-medium"
        >
          Return to Console
        </Link>
      </div>
    </div>
  );
}
