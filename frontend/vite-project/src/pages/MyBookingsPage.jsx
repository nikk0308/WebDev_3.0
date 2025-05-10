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
      const bookings = res.data;

      const bookingsWithNames = await Promise.all(
        bookings.map(async (booking) => {
          try {
            const venueId = booking.venue?.id;
            if (!venueId) {
              console.warn('У бронювання немає venue');
              return {
                ...booking,
                venue_name: '—'
              };
            }

            const venueRes = await api.get(`/venues/${venueId}`);
            return {
              ...booking,
              venue_name: venueRes.data.name,
            };
          } catch (err) {
            console.warn(`Не вдалося завантажити назву для venue ${booking.venue_id}`);
            return { ...booking, venue_name: `#${booking.venue_id}` };
          }
        })
      );

      setBookings(bookingsWithNames);
    } catch (error) {
      console.error('Помилка завантаження бронювань:', error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      fetchBookings(userId);
    } catch (error) {
      console.error('Помилка відміни бронювання:', error);
    }
  };

  const now = new Date();

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 text-blue-600 hover:underline"
      >
        Назад на головну
      </button>

      <h1 className="text-3xl font-bold mb-6">Мої бронювання</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const start = new Date(booking.start_time);
          const end = new Date(booking.end_time);
          const canCancel = now < start;

          return (
            <div key={booking.id} className="p-4 border rounded shadow bg-white" data-testid="booking-item">
              <h2 className="text-lg font-bold">
                Майданчик: {booking.venue_name}
              </h2>
              <p>Початок: {new Date(booking.start_time).toLocaleString()}</p>
              <p>Кінець: {new Date(booking.end_time).toLocaleString()}</p>
              {booking.status !== 'cancelled' ? (
                canCancel ? (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Відмінити бронювання
                  </button>
                ) : (
                  <p className="text-gray-500 mt-2">Неможливо відмінити (вже пройшло)</p>
                )
              ) : (
                <p className="text-red-400 mt-2">Бронювання відмінено</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
