import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const [venue, setVenue] = useState({
    name: '',
    location: '',
    type: '',
    description: '',
    slots: [{ start_time: '', end_time: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (index, e) => {
    const { name, value } = e.target;
    const newSlots = [...venue.slots];
    newSlots[index][name] = value;
    setVenue((prev) => ({ ...prev, slots: newSlots }));
  };

  const addSlot = () => {
    setVenue((prev) => ({ ...prev, slots: [...prev.slots, { start_time: '', end_time: '' }] }));
  };

  const removeSlot = (index) => {
    const newSlots = venue.slots.filter((_, i) => i !== index);
    setVenue((prev) => ({ ...prev, slots: newSlots }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/venues', venue);
      alert('Майданчик успешно создан!');
      navigate('/home');
    } catch (error) {
      console.error('Ошибка создания майданчика:', error);
      alert('Ошибка создания майданчика');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-4">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 text-blue-600 hover:underline"
      >
        Назад на главную
      </button>

      <h1 className="text-2xl font-bold mb-6">Создать новый майданчик</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Название"
          value={venue.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Локация"
          value={venue.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Тип"
          value={venue.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Описание (необязательно)"
          value={venue.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <h2 className="text-xl font-bold">Доступные слоты:</h2>
        {venue.slots.map((slot, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="datetime-local"
              name="start_time"
              value={slot.start_time}
              onChange={(e) => handleSlotChange(index, e)}
              className="p-2 border rounded"
              required
            />
            <input
              type="datetime-local"
              name="end_time"
              value={slot.end_time}
              onChange={(e) => handleSlotChange(index, e)}
              className="p-2 border rounded"
              required
            />
            <button type="button" onClick={() => removeSlot(index)} className="text-red-500">
              Удалить
            </button>
          </div>
        ))}
        <button type="button" onClick={addSlot} className="text-blue-500 hover:underline">
          Добавить слот
        </button>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Создать
        </button>
      </form>
    </div>
  );
}
