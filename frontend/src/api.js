const BASE_URL = 'http://localhost:8080/alerts';

export const getAlerts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createAlert = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAlert = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteAlert = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
