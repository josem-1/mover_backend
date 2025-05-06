import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "1yr" });

	res.cookie("jwt-mover", token, {
		
		maxAge: 365 * 24 * 60 * 60 * 1000,
		//not sure why but max age has to be in millliseconds accroding to that tim guy on yt so following the format days x hours x minutes x seconds x 1000(bcuz of stupid milliseconds
		httpOnly: true, 
		sameSite: "strict", 
		secure: ENV_VARS.NODE_ENV !== "development", //still don't fully understand dev and prod difference in running, npm run dev vs run build???? the world will never know.....
	});

	return token;
};