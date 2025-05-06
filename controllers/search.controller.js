import { fetchFromTMDB, searchTMDB } from '../services/tmdb.service.js';

//search follows format from tmdb, i hate all those iff statements tho, gotta be a bettwer way to write, maybe work on this after submission

export async function search(req, res) {
  const { type, q } = req.query;
  if (!type || !q) {
    return res.status(400).json({success: false, message: 'Missing type or query parameter' });
  }
  if (!['movie','tv','person','genre'].includes(type)) {
    return res.status(400).json({success: false, message: 'Invalid search type' });
  }
  try {
    let results;
	
    if (type === 'genre') {
      const { genres } = await fetchFromTMDB('https://api.themoviedb.org/3/genre/movie/list');
      results = genres.filter(g => g.name.toLowerCase().includes(q.toLowerCase()));
    } else {
      const data = await searchTMDB(type === 'person' ? 'person' : type, q);
      results = data.results;
    }
    res.json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
