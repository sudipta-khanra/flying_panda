import { updateAlert, deleteAlert } from '../api';

export default function AlertList({ alerts, onUpdate, onDelete }) {
  const nextStatus = {
    Active: 'Booked',
    Booked: 'Expired',
    Expired: 'Expired',
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Country</th>
          <th>City</th>
          <th>Visa Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((a) => (
          <tr key={a._id}>
            <td>{a.country}</td>
            <td>{a.city}</td>
            <td>{a.visaType}</td>
            <td>{a.status}</td>
            <td>
              <button
                onClick={async () => {
                  const updated = await updateAlert(
                    a._id,
                    nextStatus[a.status]
                  );
                  onUpdate(updated);
                }}
                disabled={a.status === 'Expired'}
              >
                Update Status
              </button>

              <button
                onClick={async () => {
                  await deleteAlert(a._id);
                  onDelete(a._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
