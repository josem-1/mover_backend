import {fetchFromTMDB} from "../services/tmdb.service.js";
//these functions call to services then tmdb api to pull info, using 'v3' api, whatever the hell tmdb claims that to be 
//okay if v3 of tmdb doesnt work, imma crashout bcuz why is it so hard to use a freaking api
export async function getTrendingTv(req, res) {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({success: false, message: "gettrendingtv error in tv controller" });
	}
}

export async function getTvTrailers(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({success: false, message: "error in the get tv trailers in tv controller" });
	}
}

export async function getTvDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
		res.status(200).json({success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({success: false, message: "get tv detail error in tv controller" });
	}
}

export async function getSimilarTvs(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
		res.status(200).json({success: true, similar: data.results });
	} catch (error) {
		res.status(500).json({success: false, message:"error getsimilartvs in tv controller " });
	}
}

export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		res.status(200).json({success: true, content: data.results });
	} catch (error) {
		res.status(500).json({success: false, message: "gettvsbycategory error in tv controller" });
	}
}
