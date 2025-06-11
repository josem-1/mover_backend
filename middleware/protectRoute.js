import jwt from "jsonwebtoken";
import {User } from "../models/user.model.js";
import {ENV_VARS } from "../config/envVars.js";
//might be my best  lookking code honestly
export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies["jwt-mover"];

		if (!token) {
			return res.status(401).json({ success: false, message: "token no provided, error with token generation prolly" });
		}

		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ success: false, message: "token is wrong, maybe error with user info, check postman under 'cookies' for token " });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ success: false, message: "user not in system" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in middleware: ", error.message);
		res.status(500).json({ success: false, message: "internal error, check testing logs" });
		//heheh, back to postman. i freaking love that thing
	}
};
