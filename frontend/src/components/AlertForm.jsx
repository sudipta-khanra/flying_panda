import { useState } from 'react';
import { createAlert } from '../api';

export default function AlertForm({ onAdd }) {
  const [form, setForm] = useState({
    country: '',
    city: '',
    visaType: 'Tourist',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlert = await createAlert(form);
    onAdd(newAlert);
    setForm({ country: '', city: '', visaType: 'Tourist' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
      />
      <select name="visaType" value={form.visaType} onChange={handleChange}>
        <option>Tourist</option>
        <option>Business</option>
        <option>Student</option>
      </select>

      <button type="submit">Create Alert</button>
    </form>
  );
}
