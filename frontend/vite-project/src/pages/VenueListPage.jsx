import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function VenueListPage() {
  const [venues, setVenues] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await api.get('/venues');
      setVenues(res.data);
    } catch (error) {
      console.error('Помилка завантаження майданчиків:', error);
    }
  };

  const filteredVenues = typeFilter
    ? venues.filter((v) => v.type.toLowerCase().includes(typeFilter.toLowerCase()))
    : venues;

  const handleBookNow = (venueId) => {
    navigate(`/venues/${venueId}/book`);
  };

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 text-blue-600 hover:underline"
      >
        Назад на головну
      </button>

      <h1 className="text-3xl font-bold mb-6">Список майданчиків</h1>

      <input
        type="text"
        placeholder="Фільтр по типу..."
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="mb-6 p-2 border rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">{venue.name}</h2>
            <p>Локація: {venue.location}</p>
            <p>Тип: {venue.type}</p>
            {venue.description && <p className="italic">{venue.description}</p>}
            <button
              onClick={() => handleBookNow(venue.id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Забронювати
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}