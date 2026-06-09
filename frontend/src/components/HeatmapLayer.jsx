import { useMemo } from "react";
import { Marker } from "react-simple-maps";

// Simple heatmap: render circles with color/size based on intensity
export default function HeatmapLayer({ data = [] }) {
  // Normalize intensity for color/size
  const max = useMemo(() => Math.max(...data.map(d => d.intensity || 0), 1), [data]);
  return (
    <g>
      {data.map((point, i) => {
        // Color: low=yellow, high=red
        const percent = point.intensity / max;
        const color = `rgba(255,${Math.floor(255 - percent * 200)},0,0.5)`;
        const radius = 10 + percent * 20;
        return (
          <Marker key={i} coordinates={[point.lng, point.lat]}>
            <circle r={radius} fill={color} stroke="none" />
          </Marker>
        );
      })}
    </g>
  );
}
