import {User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res){
	try{
		console.log('[SIGNUP] req.body =', req.body);     
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)){
			return res.status(400).json({success: false, message:"Invalid email" });
		}

		if (password.length < 6){
			return res.status(400).json({success: false, message:"Password must be at least 6 characters" });
		}

		const existingUserByEmail = await User.findOne({email: email });

		if (existingUserByEmail){
			return res.status(400).json({ success: false, message:"eemail already exists" });
		}

		const existingUserByUsername = await User.findOne({username: username });

		if (existingUserByUsername){
			return res.status(400).json({success: false, message:"username already exists" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);


		const newUser = new User({
			email,
			password: hashedPassword,
			username,
			//image, // not gonna use image but gonna keep here if i ever want to add image icon for users how netflix does
		});

		generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();

		res.status(201).json({
			success: true,
			user:{
				...newUser._doc,//the tiple dot operator is actually op, gotta find ways to use this more
				password: "",
			},
		});
	} catch (error) {
		console.log("auth controller, signup error", error.message);
		res.status(500).json({success: false, message: "if i get another error, imma crashout" });
	}
}

export async function login(req, res){
	try{
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ success: false, message:"All fields are required" });
		}

		const user = await User.findOne({email: email });
		if (!user) {
			return res.status(404).json({success: false, message:"Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({success: false, message:"Invalid credentials" });//supposedly good practice to have same error message from wrong email and wrong password
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("auth controller,,login funciton error", error.message);
		res.status(500).json({ success: false, message: "...........idk anymore, but this crap aint working" });
	}
}

export async function logout(req, res){
	try{
		res.clearCookie("jwt-mover", {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/'            // make sure this matches how you set it
		  });
		res.status(200).json({ success: true, message: "logged out" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "failed to log out" });
	}
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
