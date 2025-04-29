import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../api/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    try {
      const res = await api.post('/users/register', { name, email, password });
      localStorage.setItem('user', JSON.stringify({ name, email }));
      navigate('/home');
    } catch (error) {
      console.error('Register error:', error);
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
      <AuthForm onSubmit={handleRegister} title="Регистрация" buttonText="Зарегистрироваться" showNameField={true} />
      <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
        Уже есть аккаунт? Войти
      </button>
    </div>
  );
}
