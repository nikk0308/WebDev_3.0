import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
      <h1 className="text-4xl font-bold mb-6">404 - Страница не найдена</h1>
      <button onClick={() => navigate('/home')} className="text-blue-600 hover:underline">
        На главную
      </button>
    </div>
  );
}
