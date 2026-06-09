import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import HeatmapLayer from "./HeatmapLayer";

export default function MapView({ data, countryLocation, heatmapData }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">Disease Map & Heatmap</h2>
      <ComposableMap>
        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {/* Heatmap overlay */}
        {heatmapData && heatmapData.length > 0 && <HeatmapLayer data={heatmapData} />}
        {/* Main marker for country dashboard */}
        {countryLocation && (
          <Marker coordinates={[countryLocation.lng, countryLocation.lat]}>
            <circle r={7} fill="#e53e3e" stroke="#fff" strokeWidth={2} />
          </Marker>
        )}
      </ComposableMap>
    </div>
  );
}