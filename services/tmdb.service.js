import axios from "axios";
import { ENV_VARS } from "../config/envVars.js"; //this sendss me bak to backend folder and then to the config with ethe variables from envvaars which gives me the variables form .env

export const fetchFromTMDB = async (url) => {
  try {
    // v3 for tmdb api, the question mark is from sample co
    const fullUrl = url.includes("?")
      ? `${url}&api_key=${ENV_VARS.TMDB_API_KEY}`
      : `${url}?api_key=${ENV_VARS.TMDB_API_KEY}`;

    const response = await axios.get(fullUrl, {
      headers: { accept: "application/json" },
    });

    return response.data;
  } catch{
    console.log("Tmdb is a bum and is giving you errors, so check in postman logs to square up with it");
    throw error;
    //ahh shit, here we go again...back to postman, heheh
    //man i freakin love postman, the only thing about this project that i actually like is the testing of it
  }
};

//in the async functions,, type is like movie or tv show and query is the id number
export async function searchTMDB(type, query) {
  const url = `https://api.themoviedb.org/3/search/${type}?language=en-US&query=${encodeURIComponent(query)}`;
  return fetchFromTMDB(url);
}

export async function getMediaDetails(type, id) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&append_to_response=credits`
  );
}

export async function getSimilar(type, id) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US`
  );
}

export async function discoverByGenre(genreId) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}`
  );
}

export async function getPersonCredits(personId) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`
  );
}

export async function getWatchProviders(type, id) {
  
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/${type}/${id}/watch/providers`
  );
}
