import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors';


import searchRoutes from './routes/search.route.js';
import mediaRoutes  from './routes/media.route.js';
import authRoutes   from './routes/auth.route.js';
import userRoutes   from './routes/user.route.js';
import genreRoutes  from './routes/genre.route.js';
import personRoutes from './routes/person.route.js';
import trendingRoutes from './routes/trending.route.js';

import {ENV_VARS } from "./config/envVars.js";
import {connectDB } from "./config/db.js";
import {protectRoute } from "./middleware/protectRoute.js";



const app = express();

app.use(cors({
	origin: 'https://mover-frontend-1.onrender.com',
	credentials: true
}));

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.get('/', (_req, res) => res.send('OK'));


app.use(express.json()); 
app.use(cookieParser());


console.log("AuthRoutes: ", authRoutes);
app.use("/api/auth", authRoutes);

console.log("SearchRoutes: ", searchRoutes);
app.use('/api/search', searchRoutes);

console.log("mediaRoutes: ", mediaRoutes);
app.use('/api/media', mediaRoutes);

console.log("genreRoutes: ", genreRoutes);
app.use('/api/genre',  protectRoute, genreRoutes);

console.log("personRoutes: ", personRoutes);
app.use('/api/person', protectRoute, personRoutes);

console.log("trendingRoutes: ", trendingRoutes);
app.use('/api/trending', protectRoute, trendingRoutes);

console.log("userRoutes: ", userRoutes);
app.use('/api/user', protectRoute, userRoutes);

// if (ENV_VARS.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "../frontend/build")));

// 	app.get("/*", (_req, res) => {
// 		res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// 	});
// }

app.listen(PORT, '0.0.0.0', () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
