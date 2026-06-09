import React, { useEffect, useState } from "react";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const IN_HEALTH_URL = `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${NEWS_API_KEY}`;
const GLOBAL_HEALTH_URL = `https://newsapi.org/v2/top-headlines?category=health&apiKey=${NEWS_API_KEY}`;
const IN_GENERAL_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;
const PLACEHOLDER_IMG = "https://via.placeholder.com/128x96?text=News";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!NEWS_API_KEY) {
      setError("News API key not configured. Add VITE_NEWS_API_KEY in frontend/.env to enable live news.");
      setLoading(false);
      return;
    }

    // Try Indian health news first
    fetch(IN_HEALTH_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok" && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setError(null);
          setLoading(false);
        } else {
          // Fallback: Try global health news
          fetch(GLOBAL_HEALTH_URL)
            .then(res2 => res2.json())
            .then(data2 => {
              if (data2.status === "ok" && data2.articles && data2.articles.length > 0) {
                setArticles(data2.articles);
                setError(null);
              } else {
                // Fallback: Try general Indian news
                fetch(IN_GENERAL_URL)
                  .then(res3 => res3.json())
                  .then(data3 => {
                    if (data3.status === "ok" && data3.articles && data3.articles.length > 0) {
                      setArticles(data3.articles);
                      setError(null);
                    } else {
                      setError("No news articles found.");
                      setArticles([]);
                    }
                    setLoading(false);
                  })
                  .catch(() => {
                    setError("Failed to fetch news");
                    setLoading(false);
                  });
              }
              setLoading(false);
            })
            .catch(() => {
              setError("Failed to fetch news");
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setError("Failed to fetch news");
        setLoading(false);
      });
  }, []);

  const displayedArticles = showAll ? articles : articles.slice(0, 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-10">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 flex items-center gap-3">
          <span role="img" aria-label="news">📰</span> Latest Healthcare News
        </h2>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-gray-500">No news articles found.</div>
        )}
        <ul className="space-y-6">
          {displayedArticles.map((article, idx) => (
            <li key={idx} className="border-b pb-4 flex gap-4">
              <img
                src={article.urlToImage ? article.urlToImage : PLACEHOLDER_IMG}
                alt="news"
                className="w-32 h-24 object-cover rounded-md border bg-gray-100"
                onError={e => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG; }}
              />
              <div className="flex-1">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-800 hover:underline">
                  {article.title}
                </a>
                <div className="text-gray-600 text-sm mt-1">{article.source?.name || ''} &middot; {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ''}</div>
                <p className="mt-2 text-gray-800">{article.description}</p>
              </div>
            </li>
          ))}
        </ul>
        {!showAll && articles.length > 7 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
