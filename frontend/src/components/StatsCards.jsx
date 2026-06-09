import React from 'react';

const StatsCards = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) return null;
  // Aggregate stats for all countries
  const totalCases = safeData.reduce((sum, d) => sum + (d.cases || 0), 0);
  const totalDeaths = safeData.reduce((sum, d) => sum + (d.deaths || 0), 0);
  const totalRecovered = safeData.reduce((sum, d) => sum + (d.recovered || 0), 0);
  const totalActive = safeData.reduce((sum, d) => sum + (d.active || 0), 0);

  const stats = [
    { title: "Cases", value: totalCases.toLocaleString() },
    { title: "Deaths", value: totalDeaths.toLocaleString() },
    { title: "Recovered", value: totalRecovered.toLocaleString() },
    { title: "Active", value: totalActive.toLocaleString() }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center w-full">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-xl shadow p-4 min-w-[120px] flex-1 text-center border border-gray-200"
          style={{ minWidth: 120, maxWidth: 180 }}
        >
          <div className="text-xs text-gray-500 font-semibold mb-1">{s.title}</div>
          <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">{s.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;