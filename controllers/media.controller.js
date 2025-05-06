import {getMediaDetails, getSimilar, getWatchProviders } from '../services/tmdb.service.js';

//use this file instead of spcific movie or tv controller, take code from move or media, gotta figure out how to check for tv or move, maybe use a 'type' variable

export async function getDetails(req, res) {
  const {type, id } = req.params;  // type = 'movie' or 'tv'
  try {
    const data = await getMediaDetails(type, id);

    let director;
    if (data.credits?.crew) {
      director = data.credits.crew.find(c => c.job === 'Director')?.name || data.credits.crew.find(c => c.job === 'Creator')?.name;//gotta check for 'creator' bcuz 'friends' has creator and not director
    }

    res.json({
      success: true,
      media: {
        id:data.id,
        type,
        title:data.title || data.name, // title should work for most but tmdb has samples with data.name used so, just in case
        overview:data.overview,
        posterPath:data.poster_path,
        genres:data.genres.map(g => g.name),
        director
      }
    });
  } catch (err) {
    console.error('error in media controller, get details', err);
    res.status(500).json({ success: false, message: err.message });
  }
}


export async function getSimilarContent(req, res) {
  const {type, id } = req.params;
  const {genre, director, mediaType } = req.query;

  try {
    const data = await getSimilar(type, id);
    let results = data.results || [];

    if (genre) {
      results = results.filter(item => (item.genre_ids|| []).includes(Number(genre)));
    }

    if (mediaType) {
      results = results.filter(item => item.media_type=== mediaType); //ok, sidenote, why do some languages have the triple equal sign, whats the point, genuinely, what, you gotta be extra sure its equal?????, but w3 says sytanx so i gotta listen to w3...
    }

    
    res.json({success: true, results });
  } catch (err) {
    console.error('eror in media controller for get similar content ', err);
    res.status(500).json({ success: false, message: err.message });
  }
}


export async function getProviders(req, res) {
  const { type, id } = req.params;
  try {
    const data = await getWatchProviders(type, id);
    // data.results has something to do with country code
    res.json({ success: true, providers: data.results });
  } catch (err) {
    console.error('error in media controller for getProviders:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}
