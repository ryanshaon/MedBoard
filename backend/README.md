# MedBoard Backend

Express API for the MedBoard disease surveillance dashboard.

## Features

- Global disease statistics from public health APIs
- Country-level health dashboard data
- Outbreak alert aggregation from health RSS feeds
- Disease heatmap data for map visualization
- MongoDB storage for saved disease records

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Axios
- RSS Parser

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

## Environment Variables

```text
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/medboard
```

## API Routes

```text
GET  /api/disease/live
GET  /api/disease/all
GET  /api/disease/stored
POST /api/disease/save
GET  /api/disease/heatmap
GET  /api/disease/:disease
GET  /api/country/:country
```
