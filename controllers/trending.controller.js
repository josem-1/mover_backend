import {fetchFromTMDB } from '../services/tmdb.service.js';
//functions for get trending stuff, following api sample format

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
    );
    return res.json({ success: true, results: data.results });
  } catch (err) {
    console.error('[Trending] Movies', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}


export async function getTrendingTV(req, res) {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
    );
    return res.json({ success: true, results: data.results });
  } catch (err) {
    console.error('[Trending] TV', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
