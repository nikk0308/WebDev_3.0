import React, { useState } from 'react';

export default function AuthForm({ onSubmit, title, buttonText, showNameField = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showNameField) {
      onSubmit(formData);
    } else {
      const { email, password } = formData;
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      {showNameField && (
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Почта"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
}
