# MedBoard Frontend

React frontend for the MedBoard disease surveillance dashboard.

## Features

- Global disease statistics dashboard
- Country-level disease insights
- Disease-specific search and reports
- Interactive world map and heatmap visualization
- Outbreak alerts and health news feed
- Trend charts for case patterns

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Simple Maps

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

```text
VITE_API_BASE_URL=http://localhost:8000/api
VITE_NEWS_API_KEY=your_newsapi_key_here
```

`VITE_NEWS_API_KEY` is optional for local demos, but live news will not load without it.
