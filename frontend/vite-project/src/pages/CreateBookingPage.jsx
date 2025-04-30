import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function CreateBookingPage() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
      fetchSlots();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchSlots = async () => {
    try {
      const res = await api.get(`/venues/${venueId}/slots`);
      setSlots(res.data);
    } catch (error) {
      console.error('Помилка завантаження слотів:', error);
    }
  };

  const handleBooking = async (slot) => {
    try {
      await api.post('/bookings', {
        user_id: userId,
        venue_id: venueId,
        start_time: slot.start_time,
        end_time: slot.end_time,
      });
      alert('Бронювання успішне!');
      navigate('/home');
    } catch (error) {
      console.error('Помилка бронювання:', error);
      alert('Помилка бронювання');
    }
  };

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 text-blue-600 hover:underline"
      >
        Назад на головну
      </button>
      <h1 className="text-3xl font-bold mb-6">Доступні слоти для бронювання</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.filter(s => s.is_available !== false).map((slot, index) => (
          <div key={index} className="p-4 border rounded shadow bg-white">
            <p>Початок: {new Date(slot.start_time).toLocaleString()}</p>
            <p>Кінець: {new Date(slot.end_time).toLocaleString()}</p>
            <button
              onClick={() => handleBooking(slot)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Забронювати
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
