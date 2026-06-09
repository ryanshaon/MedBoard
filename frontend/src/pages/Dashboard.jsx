import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import StatsCards from "../components/StatsCards";
import TrendChart from "../components/TrendChart";
import MapView from "../components/MapView";
import AlertsFeed from "../components/AlertsFeed";
import DiseaseSearchBar from "../components/DiseaseSearchBar";
import { getLiveDiseaseData, getDiseaseHeatmap, getGlobalTrend } from "../services/api";

export default function Dashboard() {
  const [diseaseData, setDiseaseData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (query) => {
    setLoading(true);
    const [res, heatmapRes, trendRes] = await Promise.all([
      getLiveDiseaseData(),
      getDiseaseHeatmap(),
      getGlobalTrend()
    ]);
    setDiseaseData(
      query
        ? res.data.filter(
            (item) =>
              item.country?.toLowerCase().includes(query.toLowerCase()) ||
              item.countryInfo?.iso2?.toLowerCase() === query.toLowerCase()
          )
        : res.data
    );
    setHeatmapData(heatmapRes.data);
    setTrendData(trendRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-10">
      <div className="max-w-5xl mx-auto w-full mt-10 space-y-8">
        {/* Search Bars Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <SearchBar onSearch={fetchData} />
          </div>
          <div className="flex-1 w-full">
            <DiseaseSearchBar />
          </div>
        </div>
        {/* Stats Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span role="img" aria-label="stats">📊</span> Global Disease Stats
          </h2>
          <StatsCards data={diseaseData} />
        </div>
        {/* Disease Trend Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span role="img" aria-label="chart">📈</span> Disease Trend
          </h3>
          <TrendChart data={trendData} />
        </div>
        {/* Map & Heatmap Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span role="img" aria-label="map">🗺️</span> Disease Map & Heatmap
          </h3>
          <MapView data={diseaseData} heatmapData={heatmapData} />
        </div>
        {/* Outbreak Alerts Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span role="img" aria-label="alert">🚨</span> Outbreak Alerts
          </h3>
          <AlertsFeed data={diseaseData} />
        </div>
      </div>
    </div>
  );
}