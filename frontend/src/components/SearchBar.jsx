import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    // Capitalize first letter for country names
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    navigate(`/country/${formatted}`);
  };

  return (
    <div className="flex gap-4">
      <input
        className="border p-2 w-80 rounded"
        placeholder="Search by country (e.g. India, USA, Brazil)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
      />
      <button
        className="bg-blue-600 text-white px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}