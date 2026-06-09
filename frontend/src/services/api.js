import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const API = axios.create({
  baseURL: API_BASE_URL
});

export const getDiseaseData = (disease) =>
  API.get(`/disease/${disease}`);

export const getAlerts = () =>
  API.get("/alerts");

export const getLiveDiseaseData = () => API.get("/disease/live");
export const saveDisease = (disease) => API.post("/disease/save", disease);
export const getStoredDiseases = () => API.get("/disease/stored");
export const getDiseaseHeatmap = () => API.get("/disease/heatmap");

export const getGlobalTrend = async () => {
  // Fetch global COVID-19 historical data for the last 30 days
  const res = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
  // Format for TrendChart: [{ date, cases, deaths, recovered }]
  const { cases, deaths, recovered } = res.data;
  return Object.keys(cases).map(date => ({
    date,
    cases: cases[date],
    deaths: deaths[date],
    recovered: recovered[date]
  }));
};