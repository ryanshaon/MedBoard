import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import StatsCards from "../components/StatsCards";
import TrendChart from "../components/TrendChart";
import MapView from "../components/MapView";
import AlertsFeed from "../components/AlertsFeed";

export default function CountryDashboard() {
  const { country } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/country/${country}`)
      .then(res => setData(res.data));
  }, [country]);

  if (!data) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-lg font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-10">
      <div className="max-w-5xl mx-auto mt-10 space-y-8">
        {/* Country Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-blue-100">
          <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3 mb-2">
            <span role="img" aria-label="flag">🏳️</span> {data.country}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold text-blue-600">Population:</span> <span className="text-lg font-bold text-gray-900">{data.population?.toLocaleString() ?? 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Active outbreaks:</span> <span className="text-lg font-bold text-red-600">{data.majorOutbreaks ?? 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Most reported disease:</span> <span className="text-lg font-bold text-gray-900">{data.mostReportedDisease ?? 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Mortality rate:</span> <span className="text-lg font-bold text-gray-900">{data.mortalityRate ?? 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Vaccination coverage:</span> <span className="text-green-700 font-bold">{data.vaccinationCoverage ?? 'N/A'}</span></p>
            </div>
            <div className="space-y-3 text-gray-700">
              <h3 className="font-semibold text-blue-700 mb-2">Health Indicators</h3>
              <p><span className="font-semibold">Life expectancy:</span> {data.healthIndicators?.lifeExpectancy ?? 'N/A'}</p>
              <p><span className="font-semibold">Healthcare spending:</span> {data.healthIndicators?.healthcareSpending ?? 'N/A'}% GDP</p>
              <p><span className="font-semibold">Hospital beds/1000:</span> {data.healthIndicators?.hospitalBeds ?? 'N/A'}</p>
              <p><span className="font-semibold">Vaccination rate:</span> {data.healthIndicators?.vaccinationRate ?? 'N/A'}%</p>
            </div>
          </div>
        </div>
        {/* Disease Trend Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="chart">📈</span> Disease Trend</h3>
          <TrendChart data={data.trend} />
        </div>
        {/* Map & Heatmap Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="map">🗺️</span> Disease Map & Heatmap</h3>
          <MapView countryLocation={data.countryLocation} heatmapData={data.heatmapData} />
        </div>
        {/* Outbreak Alerts Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="alert">🚨</span> Outbreak Alerts</h3>
          <AlertsFeed data={data.outbreaks} />
        </div>
        {/* Top Diseases Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Top Diseases</h3>
          <ol className="list-decimal ml-6">
            {(data.topDiseases || []).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </div>
        {/* Comparative Statistics Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Comparative Statistics (Dengue cases)</h3>
          <ul>
            {(data.comparative || []).map((c, i) => (
              <li key={i}>{c.country}: {c.dengue?.toLocaleString?.() ?? 'N/A'}</li>
            ))}
          </ul>
        </div>
        {/* Historical Timeline Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Historical Timeline</h3>
          <ul>
            {(data.timeline || []).map((t, i) => (
              <li key={i}>{t.year} – {t.event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}