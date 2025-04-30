import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../api/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    try {
      const res = await api.post('/users/register', { name, email, password });
      const { id, name: userName, email: userEmail } = res.data;
      localStorage.setItem('user', JSON.stringify({ id, name: userName, email: userEmail }));
      navigate('/home');
    } catch (error) {
      console.error('Register error:', error);
      alert('Помилка реєстрації');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Реєстрація</h1>
      <AuthForm onSubmit={handleRegister} title="Реєстрація" buttonText="Зареєструватися" showNameField={true} />
      <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
        Вже є акаунт? Увійти
      </button>
    </div>
  );
}
