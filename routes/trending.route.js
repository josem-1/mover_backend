import express from 'express';
import {getTrendingMovies,getTrendingTV} from '../controllers/trending.controller.js';

const router = express.Router();

router.get('/movie', getTrendingMovies);
router.get('/tv',    getTrendingTV);

export default router;
