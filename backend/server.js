import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Disease Tracker API Running");
});

app.use("/api/disease", diseaseRoutes);
app.use("/api/country", countryRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);