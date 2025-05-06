import express from "express";
import {getSimilarTvs,getTrendingTv,getTvDetails,getTvsByCategory,getTvTrailers,} from "../controllers/tv.controller.js";
//might not use anymore since gonna use media routes but keeping for reference
const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);

export default router;