import express from 'express';
import {getGenreMovies } from '../controllers/genre.controller.js';

const router = express.Router();
router.get('/:id', getGenreMovies);//for some bull crap reason, the whole program will crash out if this line is not correct. program is just like me fr

export default router;
