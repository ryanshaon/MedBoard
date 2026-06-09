import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CountryDashboard from "./pages/CountryDashboard";
import DiseaseDashboard from "./pages/DiseaseDashboard";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/country/:country" element={<CountryDashboard />} />
        <Route path="/disease/:disease" element={<DiseaseDashboard />} />
        <Route path="/disease" element={<DiseaseDashboard />} /> {/* Global disease view */}
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;