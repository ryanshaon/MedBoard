import express from "express";
import {
  getDiseaseData,
  saveDisease,
  getStoredDiseases,
  getAllDiseases,
  getDiseaseHeatmap,
  getDiseaseLive // add this
} from "../controllers/diseaseController.js";

const router = express.Router();

router.get("/live", getDiseaseLive); // use the new handler
router.get("/all", getAllDiseases);
router.post("/save", saveDisease);
router.get("/stored", getStoredDiseases);
router.get("/heatmap", getDiseaseHeatmap);
router.get("/:disease", getDiseaseData); // CORRECT!

export default router;