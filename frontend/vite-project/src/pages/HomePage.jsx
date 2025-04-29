import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/'); // если не залогинен — редирект на логин
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать, {user.name}!</h1>
      <button onClick={handleLogout} className="text-blue-600 hover:underline">
        Выйти
      </button>
    </div>
  );
}
