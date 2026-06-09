export default function AlertsFeed({ data }) {
  // Coerce data prop to an array to prevent filter errors
  const safeData = Array.isArray(data) ? data : [];

  // Show countries with new cases as alerts
  const alerts = safeData
    .filter((item) => item.todayCases > 1000)
    .map((item) => `${item.country}: ${item.todayCases} new cases today`);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-3">Outbreak Alerts</h2>
      <ul className="space-y-2">
        {alerts.length === 0 ? (
          <li className="text-gray-500">No major alerts</li>
        ) : (
          alerts.map((a, i) => (
            <li key={i} className="border-b pb-2">{a}</li>
          ))
        )}
      </ul>
    </div>
  );
}