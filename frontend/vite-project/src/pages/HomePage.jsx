import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreateVenue = () => {
    navigate('/venues/create');
  };

  const handleViewVenues = () => {
    navigate('/venues');
  };

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Ласкаво просимо, {user.name}!</h1>
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleCreateVenue}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Створити новий майданчик
        </button>
        <button
          onClick={handleViewVenues}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Продивитися всі майданчики
        </button>
        <button
          onClick={handleViewBookings}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Мої бронювання
        </button>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline mt-4"
        >
          Вийти
        </button>
      </div>
    </div>
  );
}
