# MedBoard

MedBoard is an AI-powered disease surveillance dashboard built in 48 hours at MedFusion HackFest. It brings global health data, outbreak alerts, country-level disease insights, and trend visualization into one dashboard for faster public-health awareness and decision-making.

## Hackathon Context

This project was built during **MedFusion HackFest** and qualified for the final round. The event was organized by **ISCB-SC RSG-India, Telangana Node at Mahindra University**.

## What It Does

MedBoard helps users explore disease and outbreak information through:

- Real-time global disease statistics
- Country-wise disease surveillance dashboards
- Disease-specific search and summaries
- Interactive map and heatmap views
- Outbreak alerts from public health feeds
- Trend charts for case patterns
- Health news monitoring

## Why It Matters

Disease outbreak information is often scattered across multiple sources. MedBoard brings these signals into one place so users can quickly understand where cases are rising, which regions are affected, and what trends are developing.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Simple Maps

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Axios
- RSS Parser

## Project Structure

```text
MedBoard/
├── backend/          # Express API and MongoDB integration
├── frontend/         # React dashboard
├── package.json      # Root helper scripts
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ryanshaon/MedBoard.git
cd MedBoard
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

Backend:

```bash
cd backend
cp .env.example .env
```

Frontend:

```bash
cd frontend
cp .env.example .env
```

### 4. Start the backend

```bash
npm run dev:backend
```

Backend runs on:

```text
http://localhost:8000
```

### 5. Start the frontend

Open a second terminal:

```bash
npm run dev:frontend
```

Frontend runs on:

```text
http://localhost:5173
```

## Core API Routes

```text
GET  /api/disease/live
GET  /api/disease/heatmap
GET  /api/disease/:disease
GET  /api/country/:country
POST /api/disease/save
```

## My Contribution

Worked across backend APIs, frontend dashboard flows, data integration, and health intelligence features as part of the hackathon team. The project was completed under a 48-hour build constraint and selected for the final round.

## Future Improvements

- Add a documented ML risk scoring module
- Add authentication for saved dashboards
- Improve deployment setup with Docker
- Add tests for API routes and frontend components
- Add more verified public-health data sources
- Add screenshots and live demo link

## Disclaimer

MedBoard is a hackathon prototype built for educational and demonstration purposes. It should not be used as a substitute for official medical or public-health guidance.
