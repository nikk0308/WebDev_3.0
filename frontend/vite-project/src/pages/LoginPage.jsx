import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../api/axiosInstance';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await api.post('/users/login', { email, password });
      const { name, email: userEmail } = res.data;
      localStorage.setItem('user', JSON.stringify({ name, email: userEmail }));
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Ошибка входа');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Вход</h1>
      <AuthForm onSubmit={handleLogin} title="Вход" buttonText="Войти" />
      <button onClick={() => navigate('/register')} className="mt-4 text-blue-600 hover:underline">
        Нет аккаунта? Зарегистрироваться
      </button>
    </div>
  );
}
