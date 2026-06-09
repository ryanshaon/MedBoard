import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <div className="max-w-3xl text-center bg-white rounded-3xl shadow-xl border border-blue-100 p-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Disease Surveillance Dashboard
        </p>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-5">
          MedBoard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A health intelligence dashboard for monitoring disease trends, outbreak alerts,
          country-level risk signals, and global health statistics in one place.
        </p>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow transition"
          onClick={() => navigate("/dashboard")}
        >
          Open Dashboard
        </button>
      </div>
    </div>
  );
}
