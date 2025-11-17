import { notFound } from 'next/navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-8">
          Artwork Not Found
        </h2>
        <a 
          href="/"
          className="inline-block bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
        >
          Return to Portfolio
        </a>
      </div>
    </div>
  );
}