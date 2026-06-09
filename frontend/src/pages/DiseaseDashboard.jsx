import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDiseaseData } from '../services/api';
import AlertsFeed from '../components/AlertsFeed';
import TrendChart from '../components/TrendChart';
import MapView from '../components/MapView';
import StatsCards from '../components/StatsCards';

const DiseaseDashboard = () => {
  const { disease } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDiseaseData(disease)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch disease data');
        setLoading(false);
      });
  }, [disease]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-lg text-red-600 font-semibold">{error}</div>;
  if (!data) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-lg font-semibold">No data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-10">
      <div className="max-w-5xl mx-auto mt-10 space-y-8">
        {/* Disease Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-blue-100">
          <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3 mb-2">
            <span role="img" aria-label="virus">🦠</span> {data.diseaseName || disease}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold text-blue-600">Description:</span> {data.description || 'N/A'}</p>
              <p><span className="font-semibold text-blue-600">Reported Cases:</span> <span className="text-lg font-bold text-red-600">{data.totalCases || 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Mortality Rate:</span> <span className="text-lg font-bold text-gray-900">{data.mortalityRate || 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Regions Affected:</span> <span className="text-gray-900">{data.regionsAffected?.join(', ') || 'N/A'}</span></p>
              <p><span className="font-semibold text-blue-600">Vaccination Coverage:</span> <span className="text-green-700 font-bold">{data.vaccinationCoverage || 'N/A'}</span></p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <StatsCards data={Array.isArray(data.stats) ? data.stats : [data.stats]} />
            </div>
          </div>
        </div>
        {/* Disease Trend Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="chart">📈</span> Disease Trend</h3>
          <TrendChart data={Array.isArray(data.trend) ? data.trend : []} />
        </div>
        {/* Map & Heatmap Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="map">🗺️</span> Disease Map & Heatmap</h3>
          <MapView heatmapData={data.heatmapData || []} countryLocation={data.countryLocation || null} />
        </div>
        {/* Alerts & Outbreaks Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span role="img" aria-label="alert">🚨</span> Alerts & Outbreaks</h3>
          <AlertsFeed data={Array.isArray(data.alerts) ? data.alerts : []} />
        </div>
      </div>
    </div>
  );
};

export default DiseaseDashboard;
