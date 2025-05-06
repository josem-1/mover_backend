import express from "express";
import cookieParser from "cookie-parser";
import path from "path";



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

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.get('/', (_req, res) => res.send('OK'));


app.use(express.json()); 
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/genre',  protectRoute, genreRoutes);
app.use('/api/person', protectRoute, personRoutes);
app.use('/api/trending', protectRoute, trendingRoutes);

app.use('/api/user', protectRoute, userRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("/*", (_req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
	});
}

app.listen(PORT, '0.0.0.0', () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
