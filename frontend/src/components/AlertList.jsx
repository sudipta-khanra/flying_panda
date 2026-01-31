import { updateAlert, deleteAlert } from '../api';

export default function AlertList({ alerts, onUpdate, onDelete }) {
  const nextStatus = {
    Active: 'Booked',
    Booked: 'Expired',
    Expired: 'Expired',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '8px 12px',
    textAlign: 'left',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#f5f5f5',
  };

  const buttonStyle = {
    padding: '5px 10px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  };

  const updateBtnStyle = (disabled) => ({
    ...buttonStyle,
    backgroundColor: disabled ? '#ccc' : '#28a745',
    color: disabled ? '#666' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  const deleteBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Country</th>
          <th style={thStyle}>City</th>
          <th style={thStyle}>Visa Type</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((a) => (
          <tr
            key={a._id}
            style={{ backgroundColor: '#fff', transition: 'background 0.2s' }}
          >
            <td style={thTdStyle}>{a.country}</td>
            <td style={thTdStyle}>{a.city}</td>
            <td style={thTdStyle}>{a.visaType}</td>
            <td style={thTdStyle}>{a.status}</td>
            <td style={thTdStyle}>
              <button
                onClick={async () => {
                  const updated = await updateAlert(
                    a._id,
                    nextStatus[a.status]
                  );
                  onUpdate(updated);
                }}
                disabled={a.status === 'Expired'}
                style={updateBtnStyle(a.status === 'Expired')}
              >
                Update Status
              </button>

              <button
                onClick={async () => {
                  await deleteAlert(a._id);
                  onDelete(a._id);
                }}
                style={deleteBtnStyle}
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
