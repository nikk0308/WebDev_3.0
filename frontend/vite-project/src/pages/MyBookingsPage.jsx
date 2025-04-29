import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    setUserId(user.id);
  }, [navigate]);

  useEffect(() => {
    if (userId) fetchBookings(userId);
  }, [userId]);

  const fetchBookings = async (uid) => {
    try {
      const res = await api.get(`/bookings/${uid}`);
      setBookings(res.data);
    } catch (error) {
      console.error('Ошибка загрузки бронирований:', error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      fetchBookings(userId);
    } catch (error) {
      console.error('Ошибка отмены бронирования:', error);
    }
  };

  const now = new Date();

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 text-blue-600 hover:underline"
      >
        Назад на главную
      </button>

      <h1 className="text-3xl font-bold mb-6">Мои бронирования</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const start = new Date(booking.start_time);
          const end = new Date(booking.end_time);
          const canCancel = now < start;

          return (
            <div key={booking.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-lg font-bold">
                Майданчик ID: {booking.venue_id}
              </h2>
              <p>Начало: {new Date(booking.start_time).toLocaleString()}</p>
              <p>Конец: {new Date(booking.end_time).toLocaleString()}</p>
              {canCancel ? (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Отменить бронирование
                </button>
              ) : (
                <p className="text-gray-500 mt-2">Нельзя отменить (уже прошло)</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
