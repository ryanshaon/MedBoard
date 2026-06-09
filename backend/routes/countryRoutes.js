import express from "express";
import { getCountryDashboard } from "../controllers/countryController.js";
const router = express.Router();

router.get("/:country", getCountryDashboard);

export default router;