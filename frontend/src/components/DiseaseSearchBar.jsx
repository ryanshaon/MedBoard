import React, { useState } from 'react';
import { getDiseaseData } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SUPPORTED_DISEASES = ["Malaria", "Dengue", "Influenza", "COVID-19", "Tuberculosis"];

const DiseaseSearchBar = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // Trim input to avoid leading/trailing spaces
      const trimmed = query.trim();
      if (!trimmed) {
        setError('Please enter a disease name.');
        setLoading(false);
        return;
      }
      navigate(`/disease/${trimmed}`);
    } catch (err) {
      setError('Disease not found or API error.');
    }
    setLoading(false);
  };

  return (
    <div className="mb-6">
      <div className="text-xs text-gray-500 mb-2">
        Supported diseases: {SUPPORTED_DISEASES.join(", ")}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search disease..."
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default DiseaseSearchBar;
