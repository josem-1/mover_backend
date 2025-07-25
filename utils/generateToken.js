import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "1yr" });

	res.cookie("jwt-mover", token, {
		
		maxAge: 365 * 24 * 60 * 60 * 1000,
		httpOnly: true, 
		sameSite: "none", 
		secure: true, 
	});

	return token;
};
