import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  // Show top 7 countries by cases as a trend
  const chartData = safeData.slice(0, 7).map((item, idx) => ({
    day: item.country || `Day ${idx + 1}`,
    cases: item.cases
  }));

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Disease Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cases" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}