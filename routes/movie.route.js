import express from "express";
//no longer used but useful for reference when making media rout
import{getMovieDetails,getMoviesByCategory,getMovieTrailers,getSimilarMovies,getTrendingMovie,} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers); //yeah screw the trailer, i aint doing allat
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;