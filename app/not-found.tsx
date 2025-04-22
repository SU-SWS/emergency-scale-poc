'use client';
import { rebuild } from './actions';
export default function NotFound() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">404 - Page Not Found</h1>
      <p className="text-center">Sorry, the page you are looking for does not exist.</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => rebuild()} type='button'>Rebuild Site</button>
    </main>
  );
}