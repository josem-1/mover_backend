import express from 'express';
import {getGenreMovies } from '../controllers/genre.controller.js';

const router = express.Router();
router.get('/:id', getGenreMovies);
export default router;
