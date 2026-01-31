import { useEffect, useState } from 'react';
import { getAlerts } from '../api';
import AlertForm from '../components/AlertForm';
import AlertList from '../components/AlertList';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  return (
    <div>
      <h1>Visa Slot Alerts</h1>

      <AlertForm onAdd={(alert) => setAlerts([...alerts, alert])} />

      <AlertList
        alerts={alerts}
        onUpdate={(updated) =>
          setAlerts(alerts.map((a) => (a._id === updated._id ? updated : a)))
        }
        onDelete={(id) => setAlerts(alerts.filter((a) => a._id !== id))}
      />
    </div>
  );
}
