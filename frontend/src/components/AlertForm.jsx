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
    if (!form.country || !form.city)
      return alert('Please fill all required fields');
    const newAlert = await createAlert(form);
    onAdd(newAlert);
    setForm({ country: '', city: '', visaType: 'Tourist' });
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '320px', margin: '0 auto' }}
    >
      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="visaType"
        value={form.visaType}
        onChange={handleChange}
        style={selectStyle}
      >
        <option>Tourist</option>
        <option>Business</option>
        <option>Student</option>
      </select>
      <button type="submit" style={buttonStyle}>
        Create Alert
      </button>
    </form>
  );
}
