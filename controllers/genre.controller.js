import {discoverByGenre } from '../services/tmdb.service.js';

export async function getGenreMovies(req, res) {
  const {id } = req.params;
  try {
    const data = await discoverByGenre(id);
    res.json({ success: true, movies: data.results });
  } catch (err) {
    console.error('genre contoller, get genre for movies error', err);
    res.status(500).json({ success: false, message: err.message });
  }
}
