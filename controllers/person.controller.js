import {getPersonCredits } from '../services/tmdb.service.js';

export async function getPersonMedia(req, res) {
  const {id } = req.params;
  try {
    const data = await getPersonCredits(id);
    // cast and crew, from tmdb combined in this thing. wth is difference between cast and crew tho. tmdb recommends it tho...
    const combined = [...data.cast, ...data.crew];
    const unique = Array.from(
      new Map(combined.map(item => [item.id, item])).values()
    );
    res.json({ success: true, results: unique });
  } catch (err) {
    console.error('getting this persons works isnt worknig, error in get person media in person controller', err);
    res.status(500).json({ success: false, message: err.message });
  }
}
